const db = require('./db');
const { GoogleAuth } = require('google-auth-library');

// Google Play Developer API client
let auth;
const getAuth = async () => {
  if (!auth) {
    auth = new GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_KEY),
      scopes: ['https://www.googleapis.com/auth/androidpublisher']
    });
  }
  return auth;
};

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const {
      purchaseToken,
      productId,
      email,
      deviceId
    } = JSON.parse(event.body);

    // Validate required fields
    if (!purchaseToken || !productId || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Purchase token, product ID, and email are required'
        })
      };
    }

    // Check if this purchase token has already been processed
    const existingSubscription = await db.getSubscriptionByGoogleToken(purchaseToken);
    if (existingSubscription) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Subscription already exists',
          subscription: {
            isActive: existingSubscription.is_active,
            expiresAt: existingSubscription.expires_at
          }
        })
      };
    }

    // Validate the purchase with Google Play
    const authClient = await getAuth();
    const packageName = process.env.GOOGLE_PLAY_PACKAGE_NAME;

    // Build the API URL for subscription verification
    const apiUrl = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/subscriptions/${productId}/tokens/${purchaseToken}`;

    try {
      const response = await authClient.request({
        url: apiUrl,
        method: 'GET'
      });

      const purchaseData = response.data;

      // Check if the subscription is valid
      const isValid = purchaseData.paymentState === 1; // 1 = paid
      const expiresAt = purchaseData.expiryTimeMillis
        ? new Date(parseInt(purchaseData.expiryTimeMillis))
        : null;

      if (!isValid) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Invalid or unpaid subscription'
          })
        };
      }

      // Create or get user
      const user = await db.createUser(
        email.toLowerCase().trim(),
        deviceId || `google-${purchaseToken.substring(0, 10)}`,
        false, // marketing consent
        true,  // prayer reminders
        false  // newsletter
      );

      // Create subscription record
      const subscription = await db.createSubscription(user.id, user.email, 'google_play', {
        isActive: true,
        expiresAt: expiresAt,
        googlePurchaseToken: purchaseToken,
        googleProductId: productId
      });

      console.log('✅ Google Play subscription validated and stored:', {
        email: user.email,
        productId,
        expiresAt
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Subscription validated successfully',
          subscription: {
            isActive: subscription.is_active,
            expiresAt: subscription.expires_at,
            platform: 'google_play'
          }
        })
      };

    } catch (googleError) {
      console.error('Google Play API error:', googleError);

      // Handle specific Google Play API errors
      if (googleError.status === 410) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Purchase token has expired or been consumed'
          })
        };
      }

      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Failed to validate purchase with Google Play',
          details: process.env.NODE_ENV === 'development' ? googleError.message : 'Validation failed'
        })
      };
    }

  } catch (error) {
    console.error('Receipt validation error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to validate receipt',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      })
    };
  }
};