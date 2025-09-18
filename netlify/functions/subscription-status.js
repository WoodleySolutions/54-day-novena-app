const db = require('./db');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get email from query parameters
    const { email, deviceId } = event.queryStringParameters || {};

    if (!email && !deviceId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Email or device ID is required'
        })
      };
    }

    let user;
    let activeSubscription;

    if (email) {
      // Look up by email (preferred method)
      user = await db.getUserByEmail(email.toLowerCase().trim());
      if (user) {
        activeSubscription = await db.getActiveSubscription(user.email);
      }
    } else if (deviceId) {
      // Fallback: look up by device ID
      user = await db.getUserByDeviceId(deviceId);
      if (user) {
        activeSubscription = await db.getActiveSubscription(user.email);
      }
    }

    // Determine access level
    let hasAccess = false;
    let accessType = 'none';
    let expiresAt = null;

    if (activeSubscription && activeSubscription.is_active) {
      hasAccess = true;
      accessType = 'premium';
      expiresAt = activeSubscription.expires_at;

      // Check if subscription is actually expired
      if (activeSubscription.expires_at && new Date(activeSubscription.expires_at) <= new Date()) {
        hasAccess = false;
        accessType = 'expired';
      }
    }

    // Trial logic (if no active subscription, check if eligible for trial)
    let trialEligible = false;
    if (!hasAccess && user) {
      // User is trial eligible if they've never had a subscription
      // This could be enhanced with more sophisticated trial logic
      trialEligible = !activeSubscription;
    }

    const response = {
      hasAccess,
      accessType, // 'none', 'premium', 'expired'
      trialEligible,
      user: user ? {
        email: user.email,
        deviceId: user.device_id,
        registeredAt: user.created_at
      } : null,
      subscription: activeSubscription ? {
        platform: activeSubscription.platform,
        isActive: activeSubscription.is_active,
        expiresAt: activeSubscription.expires_at,
        createdAt: activeSubscription.created_at
      } : null,
      checkedAt: new Date().toISOString()
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('Subscription status check error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to check subscription status',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      })
    };
  }
};