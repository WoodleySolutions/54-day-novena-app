import React from 'react';
import { Crown, Lock } from 'lucide-react';
import { useSubscription } from '../../contexts/SubscriptionContext';

interface PremiumGuardProps {
  children: React.ReactNode;
  feature?: string;
  showUpgradePrompt?: boolean;
  fallback?: React.ReactNode;
  onUpgradeClick?: () => void;
}

export const PremiumGuard: React.FC<PremiumGuardProps> = ({
  children,
  feature = 'this feature',
  showUpgradePrompt = true,
  fallback,
  onUpgradeClick
}) => {
  const { hasAccess, isTrialExpired, getSubscriptionStatusMessage } = useSubscription();
  
  // Allow access if user has premium or active trial
  if (hasAccess) {
    return <>{children}</>;
  }
  
  // Show custom fallback if provided
  if (fallback) {
    return <>{fallback}</>;
  }
  
  // Don't show upgrade prompt if explicitly disabled
  if (!showUpgradePrompt) {
    return null;
  }
  
  // Default upgrade prompt
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700 transition-colors duration-300">
      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full p-2 flex-shrink-0">
          {isTrialExpired ? (
            <Lock className="w-5 h-5 text-white" />
          ) : (
            <Crown className="w-5 h-5 text-white" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {isTrialExpired ? 'Premium Feature' : 'Upgrade to Premium'}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {isTrialExpired
              ? `Your free trial has expired. Upgrade to continue using ${feature}.`
              : `Unlock ${feature} and all premium features with a subscription.`
            }
          </p>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            {getSubscriptionStatusMessage()}
          </div>
          
          {onUpgradeClick && (
            <button
              onClick={onUpgradeClick}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
            >
              {isTrialExpired ? 'Upgrade Now' : 'Start Free Trial'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};