import React, { createContext, useContext, useCallback, useEffect, useMemo, ReactNode } from 'react';

// =============================================================================
// TYPES & INTERFACES - Designed for Future Expansion
// =============================================================================

export interface TrialState {
  trialStartDate: Date | null;
  trialEndDate: Date | null;
  isTrialActive: boolean;
  isTrialExpired: boolean;
  daysRemaining: number;
  isPremiumUser: boolean;
  hasSeenWelcome: boolean;
}

// Future expansion: Different subscription tiers
export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'pro';

// Future expansion: Feature access control
export interface FeatureFlags {
  // Current features
  fiftyFourDayNovena: boolean;
  basicProgressTracking: boolean;
  intentionSetting: boolean;
  
  // Future prayer types
  divineNovena?: boolean;
  sacredHeartNovena?: boolean;
  stJosephNovena?: boolean;
  customNovenas?: boolean;
  
  // Future premium features
  analyticsAndInsights?: boolean;
  customReminders?: boolean;
  prayerStreaks?: boolean;
  communityFeatures?: boolean;
  offlineMode?: boolean;
  exportData?: boolean;
  prioritySupport?: boolean;
  
  // Future integrations
  calendarSync?: boolean;
  shareProgress?: boolean;
  prayerJournal?: boolean;
}

export interface SubscriptionState extends TrialState {
  // Current subscription info
  subscriptionTier: SubscriptionTier;
  features: FeatureFlags;
  
  // Future expansion: subscription details
  subscriptionId?: string;
  customerId?: string;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  
  // Usage analytics (future)
  lastActiveDate?: Date;
  totalPrayersCompleted?: number;
  currentStreak?: number;
  longestStreak?: number;
}

// Actions for state management
interface SubscriptionActions {
  // Trial management
  startTrial: () => void;
  activatePremium: () => void;
  deactivatePremium: () => void;
  markWelcomeSeen: () => void;
  clearTrialData: () => void;
  
  // Future actions
  upgradeTier?: (tier: SubscriptionTier) => void;
  cancelSubscription?: () => void;
  reactivateSubscription?: () => void;
  updateFeatures?: (features: Partial<FeatureFlags>) => void;
  
  // Utility functions
  hasFeature: (feature: keyof FeatureFlags) => boolean;
  getSubscriptionStatusMessage: () => string;
  refreshSubscriptionState: () => void;
  
  // Computed properties (backward compatibility)
  hasAccess: boolean;
}

export type SubscriptionContextType = SubscriptionState & SubscriptionActions;

// =============================================================================
// CONSTANTS - Easy to modify for expansion
// =============================================================================

const TRIAL_DURATION_DAYS = 7;
const STORAGE_KEYS = {
  TRIAL_DATA: 'novena-trial-data',
  PREMIUM_STATUS: 'novena-premium-status',
  WELCOME_SEEN: 'novena-welcome-seen',
  SUBSCRIPTION_DATA: 'novena-subscription-data', // Future use
} as const;

// Feature definitions by subscription tier
const TIER_FEATURES: Record<SubscriptionTier, FeatureFlags> = {
  free: {
    fiftyFourDayNovena: false, // Requires trial/subscription
    basicProgressTracking: false,
    intentionSetting: false,
  },
  basic: { // Trial users
    fiftyFourDayNovena: true,
    basicProgressTracking: true,
    intentionSetting: true,
  },
  premium: { // Current paid tier
    fiftyFourDayNovena: true,
    basicProgressTracking: true,
    intentionSetting: true,
    // Future features would be enabled here
    divineNovena: true,
    sacredHeartNovena: true,
    analyticsAndInsights: true,
    customReminders: true,
    prayerStreaks: true,
  },
  pro: { // Future higher tier
    fiftyFourDayNovena: true,
    basicProgressTracking: true,
    intentionSetting: true,
    divineNovena: true,
    sacredHeartNovena: true,
    stJosephNovena: true,
    customNovenas: true,
    analyticsAndInsights: true,
    customReminders: true,
    prayerStreaks: true,
    communityFeatures: true,
    offlineMode: true,
    exportData: true,
    prioritySupport: true,
    calendarSync: true,
    shareProgress: true,
    prayerJournal: true,
  },
};

// =============================================================================
// CONTEXT CREATION
// =============================================================================

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

// =============================================================================
// PROVIDER COMPONENT
// =============================================================================

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [subscriptionState, setSubscriptionState] = React.useState<SubscriptionState>(() => 
    initializeSubscriptionState()
  );

  // =============================================================================
  // STATE INITIALIZATION
  // =============================================================================

  function initializeSubscriptionState(): SubscriptionState {
    let trialData: string | null = null;
    let premiumStatus: string | null = null;
    let hasSeenWelcome = false;
    
    try {
      trialData = localStorage.getItem(STORAGE_KEYS.TRIAL_DATA);
      premiumStatus = localStorage.getItem(STORAGE_KEYS.PREMIUM_STATUS);
      hasSeenWelcome = localStorage.getItem(STORAGE_KEYS.WELCOME_SEEN) === 'true';
    } catch (error) {
      console.warn('Failed to access localStorage during subscription state initialization:', error);
    }
    
    // Debug logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Subscription Debug - Raw Data:', { trialData, premiumStatus, hasSeenWelcome });
    }
    
    let trialStartDate: Date | null = null;
    let trialEndDate: Date | null = null;
    
    if (trialData) {
      try {
        const parsed = JSON.parse(trialData);
        trialStartDate = parsed.trialStartDate ? new Date(parsed.trialStartDate) : null;
        trialEndDate = parsed.trialEndDate ? new Date(parsed.trialEndDate) : null;
      } catch (error) {
        console.warn('Failed to parse trial data:', error);
      }
    }
    
    const isPremiumUser = premiumStatus === 'true';
    const now = new Date();
    
    const isTrialActive = Boolean(
      trialStartDate && 
      trialEndDate && 
      now >= trialStartDate && 
      now <= trialEndDate &&
      !isPremiumUser
    );
    
    const isTrialExpired = Boolean(
      trialStartDate && 
      trialEndDate && 
      now > trialEndDate &&
      !isPremiumUser
    );
    
    const daysRemaining = trialEndDate 
      ? Math.max(0, Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
      : 0;

    // Determine subscription tier
    let subscriptionTier: SubscriptionTier = 'free';
    if (isPremiumUser) {
      subscriptionTier = 'premium'; // Could be determined from subscription data in future
    } else if (isTrialActive) {
      subscriptionTier = 'basic';
    }

    const result: SubscriptionState = {
      // Trial state (legacy compatibility)
      trialStartDate,
      trialEndDate,
      isTrialActive,
      isTrialExpired,
      daysRemaining,
      isPremiumUser,
      hasSeenWelcome,
      
      // New subscription features
      subscriptionTier,
      features: TIER_FEATURES[subscriptionTier],
      
      // Future expansion ready
      lastActiveDate: new Date(),
    };
    
    // Debug logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Subscription Debug - Computed State:', result);
    }
    
    return result;
  }

  // =============================================================================
  // ACTION HANDLERS
  // =============================================================================

  const refreshSubscriptionState = useCallback(() => {
    setSubscriptionState(initializeSubscriptionState());
  }, []);

  const startTrial = useCallback(() => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + TRIAL_DURATION_DAYS);
    
    const newTrialData = {
      trialStartDate: startDate.toISOString(),
      trialEndDate: endDate.toISOString()
    };
    
    try {
      localStorage.setItem(STORAGE_KEYS.TRIAL_DATA, JSON.stringify(newTrialData));
      refreshSubscriptionState();
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🎉 Trial started successfully!');
      }
    } catch (error) {
      console.error('Failed to start trial:', error);
    }
  }, [refreshSubscriptionState]);

  const activatePremium = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PREMIUM_STATUS, 'true');
      refreshSubscriptionState();
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🎉 Premium activated successfully!');
      }
    } catch (error) {
      console.error('Failed to activate premium:', error);
    }
  }, [refreshSubscriptionState]);

  const deactivatePremium = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.PREMIUM_STATUS);
      refreshSubscriptionState();
    } catch (error) {
      console.error('Failed to deactivate premium:', error);
    }
  }, [refreshSubscriptionState]);

  const markWelcomeSeen = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WELCOME_SEEN, 'true');
      refreshSubscriptionState();
    } catch (error) {
      console.error('Failed to mark welcome seen:', error);
    }
  }, [refreshSubscriptionState]);

  const clearTrialData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.TRIAL_DATA);
      localStorage.removeItem(STORAGE_KEYS.PREMIUM_STATUS);
      localStorage.removeItem(STORAGE_KEYS.WELCOME_SEEN);
      refreshSubscriptionState();
    } catch (error) {
      console.error('Failed to clear trial data:', error);
    }
  }, [refreshSubscriptionState]);

  // =============================================================================
  // UTILITY FUNCTIONS
  // =============================================================================

  const hasFeature = useCallback((feature: keyof FeatureFlags): boolean => {
    return Boolean(subscriptionState.features[feature]);
  }, [subscriptionState.features]);

  const getSubscriptionStatusMessage = useCallback(() => {
    if (subscriptionState.isPremiumUser) {
      return 'Premium subscription active';
    }
    
    if (subscriptionState.isTrialActive) {
      const days = subscriptionState.daysRemaining;
      if (days === 1) {
        return 'Last day of your free trial';
      } else if (days === 0) {
        return 'Trial expires today';
      } else {
        return `${days} days left in your free trial`;
      }
    }
    
    if (subscriptionState.isTrialExpired) {
      return 'Free trial has expired';
    }
    
    return 'Start your 7-day free trial';
  }, [subscriptionState]);

  // =============================================================================
  // COMPUTED VALUES
  // =============================================================================

  const hasAccess = useMemo(() => {
    return subscriptionState.isPremiumUser || subscriptionState.isTrialActive;
  }, [subscriptionState.isPremiumUser, subscriptionState.isTrialActive]);

  // =============================================================================
  // CONTEXT VALUE
  // =============================================================================

  const contextValue: SubscriptionContextType = {
    // State
    ...subscriptionState,
    
    // Computed values (for backward compatibility)
    hasAccess,
    
    // Actions
    startTrial,
    activatePremium,
    deactivatePremium,
    markWelcomeSeen,
    clearTrialData,
    hasFeature,
    getSubscriptionStatusMessage: getSubscriptionStatusMessage,
    refreshSubscriptionState,
  };

  // =============================================================================
  // AUTO-REFRESH TIMER
  // =============================================================================

  useEffect(() => {
    const interval = setInterval(() => {
      refreshSubscriptionState();
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [refreshSubscriptionState]);

  return (
    <SubscriptionContext.Provider value={contextValue}>
      {children}
    </SubscriptionContext.Provider>
  );
};

// =============================================================================
// HOOKS FOR CONSUMPTION
// =============================================================================

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

// Legacy compatibility hook - same API as old useTrialState
export const useTrialState = () => {
  const subscription = useSubscription();
  
  return {
    // Original API maintained for backward compatibility
    trialStartDate: subscription.trialStartDate,
    trialEndDate: subscription.trialEndDate,
    isTrialActive: subscription.isTrialActive,
    isTrialExpired: subscription.isTrialExpired,
    daysRemaining: subscription.daysRemaining,
    isPremiumUser: subscription.isPremiumUser,
    hasSeenWelcome: subscription.hasSeenWelcome,
    hasAccess: subscription.hasAccess,
    
    // Actions
    startTrial: subscription.startTrial,
    activatePremium: subscription.activatePremium,
    deactivatePremium: subscription.deactivatePremium,
    markWelcomeSeen: subscription.markWelcomeSeen,
    clearTrialData: subscription.clearTrialData,
    refreshTrialState: subscription.refreshSubscriptionState,
    getTrialStatusMessage: subscription.getSubscriptionStatusMessage,
  };
};

export default SubscriptionContext;