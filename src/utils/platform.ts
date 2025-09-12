export type Platform = 'web' | 'android' | 'ios';

/**
 * Detect the current platform
 * For now, we'll use user agent detection, but this can be enhanced
 * when the app is packaged for mobile platforms
 */
export const detectPlatform = (): Platform => {
  if (typeof window === 'undefined') return 'web';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  // Check if running in Android WebView or Capacitor
  if (userAgent.includes('android')) {
    return 'android';
  }
  
  // Check if running in iOS WebView or Capacitor
  if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
    return 'ios';
  }
  
  // Default to web
  return 'web';
};

/**
 * Check if the current platform should use Stripe payments
 */
export const shouldUseStripePayments = (): boolean => {
  const platform = detectPlatform();
  // Only use Stripe on web platform
  return platform === 'web';
};

/**
 * Check if the current platform should use Google Play Billing
 */
export const shouldUseGooglePlayBilling = (): boolean => {
  const platform = detectPlatform();
  return platform === 'android';
};

/**
 * Check if payments are disabled for the current platform
 */
export const arePaymentsDisabled = (): boolean => {
  const platform = detectPlatform();
  // For now, disable payments on iOS until we implement App Store billing
  return platform === 'ios';
};

/**
 * Get platform-specific payment method name
 */
export const getPaymentMethodName = (): string => {
  const platform = detectPlatform();
  switch (platform) {
    case 'web':
      return 'Stripe';
    case 'android':
      return 'Google Play';
    case 'ios':
      return 'App Store';
    default:
      return 'Unknown';
  }
};