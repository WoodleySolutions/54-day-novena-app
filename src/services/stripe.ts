import { loadStripe, Stripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG, isStripeConfigured } from '../config/stripe';

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = () => {
  if (!stripePromise && isStripeConfigured()) {
    stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);
  }
  return stripePromise;
};

export interface CheckoutOptions {
  priceId: string;
  userId?: string;
  email?: string;
  metadata?: Record<string, string>;
}

export const createCheckoutSession = async (options: CheckoutOptions) => {
  try {
    // In a full implementation, this would call your backend API
    // For now, we'll use Stripe Checkout directly (requires backend later)
    
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe is not configured');
    }

    // This is a placeholder - in production you'd call your backend
    // which would create the checkout session server-side
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: options.priceId,
        userId: options.userId,
        email: options.email,
        metadata: options.metadata,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    
    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Stripe checkout error:', error);
    throw error;
  }
};

// Smart demo/production mode switching
const isDemoMode = () => {
  // Use demo mode in development OR if debug mode is enabled
  return process.env.NODE_ENV === 'development' || 
         localStorage.getItem('stripe-demo-mode') === 'true' ||
         !isStripeConfigured();
};

// For testing/demo purposes - with production fallback
export const createDirectCheckout = async (priceId: string, email?: string) => {
  // Demo mode: Show confirmation dialog
  if (isDemoMode()) {
    console.log('🎭 Demo Mode: Would create checkout for:', { priceId, email });
    
    const productInfo = getProductInfo(priceId.includes('yearly') ? 'yearly' : 'monthly');
    const shouldSimulateSuccess = window.confirm(
      `Demo Mode: This would redirect to Stripe Checkout for the ${priceId.includes('yearly') ? 'yearly' : 'monthly'} plan (${formatPrice(productInfo.price)}).\n\nClick OK to simulate successful payment, Cancel to simulate payment failure.`
    );
    
    if (shouldSimulateSuccess) {
      // Simulate successful payment
      console.log('🎉 Demo: Payment successful!');
      return { success: true, demo: true };
    } else {
      // Simulate payment cancellation
      throw new Error('Demo: Payment cancelled by user');
    }
  }

  // Production mode: Use real Stripe API
  try {
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        email,
        userId: 'user_' + Date.now(), // In production, use real user ID
        metadata: {
          source: '54-day-novena-app',
          timestamp: new Date().toISOString()
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { sessionId, url } = await response.json();
    
    // Redirect to Stripe Checkout
    if (url) {
      window.location.href = url;
    } else {
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripe is not configured');
      }
      
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw error;
      }
    }
    
    return { success: true, demo: false };
    
  } catch (error) {
    console.error('Stripe checkout error:', error);
    throw error;
  }
};

export const getProductInfo = (productType: 'monthly' | 'yearly') => {
  return STRIPE_CONFIG.products[productType];
};

export const formatPrice = (price: number, currency = 'usd') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price);
};