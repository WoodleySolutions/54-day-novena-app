import React, { useState } from 'react';
import { X, Crown, Clock, Heart, Calendar, BarChart3, CreditCard, Smartphone, Globe } from 'lucide-react';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { getProductInfo, formatPrice } from '../../services/stripe';
import { shouldUseStripePayments, shouldUseGooglePlayBilling, getPaymentMethodName } from '../../utils/platform';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  feature = 'premium features'
}) => {
  const { startTrial, activatePremium, isTrialExpired, hasAccess } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');
  const [isLoading, setIsLoading] = useState(false);
  
  // Platform detection
  const useStripe = shouldUseStripePayments();
  const useGooglePlay = shouldUseGooglePlayBilling();
  const paymentMethodName = getPaymentMethodName();
  
  if (!isOpen) return null;
  
  const handleStartTrial = () => {
    startTrial();
    onClose();
  };
  
  const handleUpgradeToPremium = async () => {
    setIsLoading(true);
    
    try {
      if (useStripe) {
        // Web platform - use Stripe
        const productInfo = getProductInfo(selectedPlan === 'annual' ? 'yearly' : 'monthly');
        
        console.log('Starting Stripe checkout for:', {
          plan: selectedPlan,
          priceId: productInfo.priceId,
          amount: productInfo.price
        });
        
        // Demo: Show what would happen in production
        const shouldSimulateSuccess = window.confirm(
          `Demo Mode (Web): This would redirect to Stripe Checkout for the ${selectedPlan} plan (${formatPrice(productInfo.price)}).\n\nClick OK to simulate successful payment, Cancel to simulate payment failure.`
        );
        
        if (shouldSimulateSuccess) {
          activatePremium();
        }
      } else if (useGooglePlay) {
        // Android platform - show Google Play billing message
        alert(
          `Google Play Billing Integration\n\nThis feature will be implemented when the app is ready for the Google Play Store.\n\nFor now, enjoy all features for free!`
        );
        // For development, grant access
        activatePremium();
      } else {
        // Other platforms - show appropriate message
        alert(
          `Payment processing for ${paymentMethodName} is not yet implemented.\n\nFor now, enjoy all features for free!`
        );
        activatePremium();
      }
      
      console.log('🎉 Demo: Premium activated successfully!');
      onClose();
      
      // In production, this would be:
      // await createDirectCheckout(productInfo.priceId);
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const premiumFeatures = [
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Complete 54-Day Novena Structure",
      description: "27 days of petition followed by 27 days of thanksgiving, perfectly organized"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Daily Prayer Guidance",
      description: "Step-by-step rosary prayers with rotating mysteries and traditional Catholic prayers"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Progress Tracking & Intentions",
      description: "Track completed days, set personal intentions, and maintain spiritual momentum"
    }
  ];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-2xl p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Crown className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {isTrialExpired ? 'Continue Your Journey' : 'Unlock Premium Features'}
            </h2>
            <p className="text-purple-100">
              {isTrialExpired 
                ? 'Your trial has ended. Subscribe to continue using all features.'
                : 'Start your 7-day free trial and deepen your prayer life.'
              }
            </p>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Premium Features */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Premium Features Include:
            </h3>
            <div className="space-y-3">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5">
                    {feature.icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {feature.title}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 text-xs">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Platform Indicator */}
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-2">
              {useGooglePlay ? <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" /> : <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              <span className="text-sm text-blue-800 dark:text-blue-200">
                Payment via {paymentMethodName}
                {useGooglePlay && " (Coming Soon)"}
              </span>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-3">
              {/* Annual Plan */}
              <div 
                onClick={() => setSelectedPlan('annual')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedPlan === 'annual'
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedPlan === 'annual' 
                        ? 'border-purple-500 bg-purple-500' 
                        : 'border-gray-300 dark:border-gray-500'
                    }`}>
                      {selectedPlan === 'annual' && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Annual Plan
                    </span>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                    Save 40%
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(getProductInfo('yearly').price)}<span className="text-sm font-normal text-gray-500"> / year</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Just {formatPrice(getProductInfo('yearly').price / 12)} per month
                </div>
              </div>
              
              {/* Monthly Plan */}
              <div 
                onClick={() => setSelectedPlan('monthly')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedPlan === 'monthly'
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPlan === 'monthly' 
                      ? 'border-purple-500 bg-purple-500' 
                      : 'border-gray-300 dark:border-gray-500'
                  }`}>
                    {selectedPlan === 'monthly' && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Monthly Plan
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(getProductInfo('monthly').price)}<span className="text-sm font-normal text-gray-500"> / month</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            {!isTrialExpired && !hasAccess && (
              <button
                onClick={handleStartTrial}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Clock className="w-5 h-5" />
                Start 7-Day Free Trial
              </button>
            )}
            
            <button
              onClick={handleUpgradeToPremium}
              disabled={isLoading}
              className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  Processing...
                </>
              ) : (
                <>
                  {useStripe ? (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Subscribe Now - {selectedPlan === 'annual' ? formatPrice(getProductInfo('yearly').price) + '/year' : formatPrice(getProductInfo('monthly').price) + '/month'}
                    </>
                  ) : useGooglePlay ? (
                    <>
                      <Smartphone className="w-5 h-5" />
                      Get Premium Access (Coming Soon)
                    </>
                  ) : (
                    <>
                      <Crown className="w-5 h-5" />
                      Get Premium Access
                    </>
                  )}
                </>
              )}
            </button>
          </div>
          
          {/* Fine Print */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Cancel anytime. No commitment required.
              {!isTrialExpired && ' Trial includes full access to all features.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};