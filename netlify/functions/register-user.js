const db = require('./db');

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
      email,
      deviceId,
      marketingConsent = false,
      prayerReminders = true,
      newsletter = false
    } = JSON.parse(event.body);

    // Validate required fields
    if (!email || !deviceId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Email and device ID are required'
        })
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Invalid email format'
        })
      };
    }

    // Create or update user
    const user = await db.createUser(
      email.toLowerCase().trim(),
      deviceId,
      marketingConsent,
      prayerReminders,
      newsletter
    );

    // Check if user has any active subscriptions
    const activeSubscription = await db.getActiveSubscription(user.email);

    const response = {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        deviceId: user.device_id,
        marketingConsent: user.email_marketing_consent,
        prayerReminders: user.prayer_reminders_consent,
        newsletter: user.newsletter_consent,
        createdAt: user.created_at
      },
      subscription: activeSubscription ? {
        isActive: activeSubscription.is_active,
        platform: activeSubscription.platform,
        expiresAt: activeSubscription.expires_at
      } : null
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('User registration error:', error);

    // Handle duplicate email (though this should be handled by upsert)
    if (error.code === '23505') {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({
          error: 'User with this email already exists'
        })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to register user',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      })
    };
  }
};