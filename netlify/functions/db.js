const { Pool } = require('pg');

// Create a connection pool for PostgreSQL
let pool;

const getPool = () => {
  if (!pool) {
    // Use Netlify's database URL (prioritize pooled connection)
    const connectionString = process.env.NETLIFY_DATABASE_URL || process.env.NETLIFY_DATABASE_URL_UNPOOLED || process.env.NEON_DATABASE_URL;

    pool = new Pool({
      connectionString: connectionString,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
  return pool;
};

// Database utility functions
const db = {
  // Execute a query
  query: async (text, params) => {
    const client = getPool();
    try {
      const result = await client.query(text, params);
      return result;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  },

  // Create or get user by email
  createUser: async (email, deviceId, marketingConsent = false, prayerReminders = true, newsletter = false) => {
    const query = `
      INSERT INTO users (email, device_id, email_marketing_consent, prayer_reminders_consent, newsletter_consent)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (email)
      DO UPDATE SET
        device_id = $2,
        email_marketing_consent = EXCLUDED.email_marketing_consent,
        prayer_reminders_consent = EXCLUDED.prayer_reminders_consent,
        newsletter_consent = EXCLUDED.newsletter_consent,
        updated_at = NOW()
      RETURNING *
    `;

    const result = await db.query(query, [email, deviceId, marketingConsent, prayerReminders, newsletter]);
    return result.rows[0];
  },

  // Get user by email
  getUserByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  },

  // Get user by device ID
  getUserByDeviceId: async (deviceId) => {
    const query = 'SELECT * FROM users WHERE device_id = $1';
    const result = await db.query(query, [deviceId]);
    return result.rows[0];
  },

  // Create subscription
  createSubscription: async (userId, email, platform, data = {}) => {
    const query = `
      INSERT INTO subscriptions (user_id, email, platform, is_active, expires_at, stripe_customer_id, stripe_subscription_id, google_purchase_token, google_product_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const result = await db.query(query, [
      userId,
      email,
      platform,
      data.isActive || false,
      data.expiresAt || null,
      data.stripeCustomerId || null,
      data.stripeSubscriptionId || null,
      data.googlePurchaseToken || null,
      data.googleProductId || null
    ]);

    return result.rows[0];
  },

  // Update subscription status
  updateSubscription: async (subscriptionId, updates) => {
    const setClause = [];
    const values = [];
    let valueIndex = 1;

    Object.keys(updates).forEach(key => {
      const dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase(); // camelCase to snake_case
      setClause.push(`${dbKey} = $${valueIndex}`);
      values.push(updates[key]);
      valueIndex++;
    });

    if (setClause.length === 0) return null;

    setClause.push('updated_at = NOW()');

    const query = `
      UPDATE subscriptions
      SET ${setClause.join(', ')}
      WHERE id = $${valueIndex}
      RETURNING *
    `;

    values.push(subscriptionId);
    const result = await db.query(query, values);
    return result.rows[0];
  },

  // Get active subscription by email
  getActiveSubscription: async (email) => {
    const query = `
      SELECT s.*, u.email, u.device_id
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      WHERE s.email = $1
      AND s.is_active = true
      AND (s.expires_at IS NULL OR s.expires_at > NOW())
      ORDER BY s.created_at DESC
      LIMIT 1
    `;

    const result = await db.query(query, [email]);
    return result.rows[0];
  },

  // Get subscription by Stripe customer ID
  getSubscriptionByStripeCustomer: async (customerId) => {
    const query = `
      SELECT s.*, u.email, u.device_id
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      WHERE s.stripe_customer_id = $1
      ORDER BY s.created_at DESC
      LIMIT 1
    `;

    const result = await db.query(query, [customerId]);
    return result.rows[0];
  },

  // Get subscription by Google purchase token
  getSubscriptionByGoogleToken: async (purchaseToken) => {
    const query = `
      SELECT s.*, u.email, u.device_id
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      WHERE s.google_purchase_token = $1
      ORDER BY s.created_at DESC
      LIMIT 1
    `;

    const result = await db.query(query, [purchaseToken]);
    return result.rows[0];
  },

  // Deactivate all subscriptions for a user (for cancellations)
  deactivateUserSubscriptions: async (email) => {
    const query = `
      UPDATE subscriptions
      SET is_active = false, updated_at = NOW()
      WHERE email = $1
      RETURNING *
    `;

    const result = await db.query(query, [email]);
    return result.rows;
  }
};

module.exports = db;