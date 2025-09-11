import React, { useEffect } from 'react';
import { CheckCircle, Heart, ArrowRight } from 'lucide-react';
import { useSubscription } from '../../contexts/SubscriptionContext';

export const PaymentSuccess: React.FC = () => {
  const { activatePremium } = useSubscription();

  useEffect(() => {
    // Activate premium when payment success page is loaded
    // In production, this would be handled by webhook from Stripe
    activatePremium();
  }, [activatePremium]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center max-w-md w-full">
        {/* Success Icon */}
        <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Premium!
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your payment was successful and your premium subscription is now active. 
          You have access to all features of the 54-Day Novena App.
        </p>

        {/* Premium Features List */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Your Premium Benefits
          </h3>
          <div className="text-left space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              Complete 54-Day Novena tracking
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              Daily prayer guidance with mysteries
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              Progress analytics and insights
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              Custom intentions and reminders
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => {
            // Navigate back to the app
            window.location.href = '/';
          }}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          Continue to Your Novena
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Support Note */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Questions about your subscription? Contact us at support@novenaapp.com
        </p>
      </div>
    </div>
  );
};