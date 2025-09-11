export const STRIPE_CONFIG = {
  // Stripe public key - replace with actual publishable key
  publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_...',
  
  // Product and price configuration
  products: {
    monthly: {
      priceId: process.env.REACT_APP_STRIPE_MONTHLY_PRICE_ID || 'price_monthly_test',
      price: 7.99,
      currency: 'usd',
      interval: 'month'
    },
    yearly: {
      priceId: process.env.REACT_APP_STRIPE_YEARLY_PRICE_ID || 'price_yearly_test', 
      price: 35.99,
      currency: 'usd',
      interval: 'year',
      discount: 40 // 40% discount vs monthly
    }
  },

  // Checkout settings
  checkout: {
    mode: 'subscription' as const,
    success_url: `${window.location.origin}/success`,
    cancel_url: `${window.location.origin}/`,
    allow_promotion_codes: true,
    billing_address_collection: 'auto' as const,
    payment_method_types: ['card', 'paypal'] as const,
    // TWA-friendly settings
    locale: 'auto' as const,
  }
};

export const isStripeConfigured = () => {
  return STRIPE_CONFIG.publishableKey.startsWith('pk_');
};