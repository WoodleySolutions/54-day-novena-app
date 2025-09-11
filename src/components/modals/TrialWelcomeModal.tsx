import React from 'react';
import { Heart, Clock, CheckCircle } from 'lucide-react';

interface TrialWelcomeModalProps {
  isOpen: boolean;
  onStartTrial: () => void;
  onSkip: () => void;
}

export const TrialWelcomeModal: React.FC<TrialWelcomeModalProps> = ({
  isOpen,
  onStartTrial,
  onSkip
}) => {
  if (!isOpen) return null;

  const features = [
    {
      icon: <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      title: "Complete 54-Day Novena Structure",
      description: "27 days of petition followed by 27 days of thanksgiving, perfectly organized"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      title: "Daily Prayer Guidance",
      description: "Step-by-step rosary prayers with rotating mysteries and traditional Catholic prayers"
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      title: "Progress Tracking & Intentions",
      description: "Track completed days, set personal intentions, and maintain spiritual momentum"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-2xl p-8 text-white text-center">
          <div className="bg-white bg-opacity-20 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Heart className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Welcome to Your Spiritual Journey</h1>
          <p className="text-purple-100 text-lg">
            Begin the powerful 54-Day Rosary Novena with professional guidance
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Free Trial Highlight */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6 border border-green-200 dark:border-green-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-500 rounded-full p-2">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-green-800 dark:text-green-200 text-xl">
                  Start Your Free 7-Day Trial
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  Full access to all features • No payment required • Cancel anytime
                </p>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4 mb-8">
            <h4 className="font-semibold text-gray-800 dark:text-white">
              What's included in your trial:
            </h4>
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                    {feature.title}
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Traditional Catholic prayers included
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Based on Fortuna Agrelli's devotion
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Cancel anytime, no commitments
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onStartTrial}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <Clock className="w-6 h-6" />
              Start My Free 7-Day Trial
            </button>
            
            <button
              onClick={onSkip}
              className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-medium transition-colors"
            >
              Maybe Later
            </button>
          </div>

          {/* Fine Print */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
            Your trial begins when you click "Start My Free 7-Day Trial". 
            No payment information required. Full access to all premium features.
          </p>
        </div>
      </div>
    </div>
  );
};