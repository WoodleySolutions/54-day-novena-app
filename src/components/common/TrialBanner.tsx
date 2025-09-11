import React from 'react';
import { Crown, Clock, AlertTriangle } from 'lucide-react';
import { useSubscription } from '../../contexts/SubscriptionContext';

interface TrialBannerProps {
  onUpgradeClick?: () => void;
  showWhenPremium?: boolean;
}

export const TrialBanner: React.FC<TrialBannerProps> = ({
  onUpgradeClick,
  showWhenPremium = false
}) => {
  const { 
    isPremiumUser, 
    isTrialActive, 
    isTrialExpired, 
    daysRemaining, 
    getSubscriptionStatusMessage 
  } = useSubscription();
  
  // Don't show banner if user is premium (unless explicitly requested)
  if (isPremiumUser && !showWhenPremium) {
    return null;
  }
  
  // Show banner during active trial or when expired (but not for new users who haven't started trial)
  if (!isPremiumUser && !isTrialActive && !isTrialExpired) {
    return null;
  }
  
  const getBannerStyle = () => {
    if (isPremiumUser) {
      return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
    }
    
    if (isTrialExpired) {
      return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
    }
    
    if (daysRemaining <= 1) {
      return 'bg-gradient-to-r from-orange-500 to-red-500 text-white';
    }
    
    return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white';
  };
  
  const getIcon = () => {
    if (isPremiumUser) {
      return <Crown className="w-4 h-4" />;
    }
    
    if (isTrialExpired || daysRemaining <= 1) {
      return <AlertTriangle className="w-4 h-4" />;
    }
    
    return <Clock className="w-4 h-4" />;
  };
  
  const getActionText = () => {
    if (isPremiumUser) {
      return null;
    }
    
    if (isTrialExpired) {
      return 'Upgrade Now';
    }
    
    if (daysRemaining <= 2) {
      return 'Upgrade Now';
    }
    
    return 'Learn More';
  };
  
  return (
    <div className={`${getBannerStyle()} px-4 py-3 rounded-lg shadow-lg mb-4 transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getIcon()}
          <span className="text-sm font-medium">
            {getSubscriptionStatusMessage()}
          </span>
        </div>
        
        {onUpgradeClick && getActionText() && (
          <button
            onClick={onUpgradeClick}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200"
          >
            {getActionText()}
          </button>
        )}
      </div>
    </div>
  );
};