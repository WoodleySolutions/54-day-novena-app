// Google Analytics 4 integration with environment variable support

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Get the tracking ID from environment variable
const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;

// Initialize Google Analytics
export const initGA = (): void => {
  // Only initialize if tracking ID is provided
  if (!GA_TRACKING_ID) {
    console.log('Google Analytics: No tracking ID provided, analytics disabled');
    return;
  }

  // Create the gtag script tag
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args);
  };

  // Configure GA
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
    // Respect user privacy
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  console.log('Google Analytics initialized with ID:', GA_TRACKING_ID);
};

// Track page views
export const trackPageView = (path: string): void => {
  if (!GA_TRACKING_ID || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('config', GA_TRACKING_ID, {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track custom events
export const trackEvent = (
  eventName: string,
  eventCategory: string = 'engagement',
  eventLabel?: string,
  value?: number
): void => {
  if (!GA_TRACKING_ID || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', eventName, {
    event_category: eventCategory,
    event_label: eventLabel,
    value: value,
  });
};

// Track novena-specific events
export const trackNovenaEvent = (action: string, additionalData?: Record<string, any>): void => {
  trackEvent(action, 'novena', undefined, undefined);
  
  // Send additional data if provided
  if (additionalData) {
    window.gtag('event', action, {
      event_category: 'novena',
      ...additionalData,
    });
  }
};

// Predefined tracking functions for common novena actions
export const analytics = {
  // Novena lifecycle
  novenaStarted: () => trackNovenaEvent('novena_started'),
  novenaCompleted: () => trackNovenaEvent('novena_completed'),
  dayCompleted: (day: number, phase: string) => 
    trackNovenaEvent('day_completed', { day_number: day, phase }),
  
  // Prayer interactions
  prayerModalOpened: (day: number, mystery: string) => 
    trackNovenaEvent('prayer_modal_opened', { day_number: day, mystery_type: mystery }),
  prayerCompleted: (day: number, mystery: string) => 
    trackNovenaEvent('prayer_completed', { day_number: day, mystery_type: mystery }),
  
  // Educational content
  learnMoreOpened: () => trackEvent('learn_more_opened', 'education'),
  
  // User engagement
  intentionSet: () => trackNovenaEvent('intention_set'),
  feedbackLinkClicked: () => trackEvent('feedback_link_clicked', 'engagement'),
  
  // Technical events
  dataCleared: () => trackEvent('data_cleared', 'technical'),
};

// Check if analytics is enabled
export const isAnalyticsEnabled = (): boolean => {
  return !!GA_TRACKING_ID;
};