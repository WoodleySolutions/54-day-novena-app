-- 54-Day Novena App Database Schema
-- Run this in your Neon database console

-- Users table for email collection and marketing
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  device_id VARCHAR(255) NOT NULL,

  -- Marketing consent flags
  email_marketing_consent BOOLEAN DEFAULT false,
  prayer_reminders_consent BOOLEAN DEFAULT true,
  newsletter_consent BOOLEAN DEFAULT false,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table for cross-platform subscription management
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL, -- Denormalized for quick lookups
  platform VARCHAR(50) NOT NULL, -- 'stripe', 'google_play', 'app_store'

  -- Subscription status
  is_active BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE,

  -- Stripe-specific fields
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),

  -- Google Play-specific fields
  google_purchase_token TEXT,
  google_product_id VARCHAR(255),

  -- App Store-specific fields (for future)
  app_store_transaction_id VARCHAR(255),
  app_store_original_transaction_id VARCHAR(255),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_device_id ON users(device_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_active ON subscriptions(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_google_token ON subscriptions(google_purchase_token);

-- Email marketing export view (for Mailchimp/ConvertKit)
CREATE VIEW email_marketing_list AS
SELECT
  u.email,
  u.email_marketing_consent,
  u.prayer_reminders_consent,
  u.newsletter_consent,
  u.created_at as signup_date,
  CASE
    WHEN s.is_active = true THEN 'premium'
    ELSE 'free'
  END as subscription_status,
  s.platform as subscription_platform
FROM users u
LEFT JOIN subscriptions s ON u.id = s.user_id
  AND s.is_active = true
  AND (s.expires_at IS NULL OR s.expires_at > NOW())
WHERE u.email_marketing_consent = true
  OR u.prayer_reminders_consent = true
  OR u.newsletter_consent = true;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some test data (optional)
-- INSERT INTO users (email, device_id, email_marketing_consent)
-- VALUES ('test@example.com', 'test-device-123', true);