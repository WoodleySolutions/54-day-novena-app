import React from 'react';
import { analytics } from '../../utils/analytics';

export const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 text-center py-6 border-t border-gray-200 bg-white/50">
      <div className="space-y-2">
        <p className="text-gray-600 text-sm">
          Developed by{' '}
          <span className="font-semibold text-gray-800">Woodley Solutions</span>
        </p>
        <p className="text-gray-500 text-xs">
          Have feedback or suggestions?{' '}
          <a 
            href="mailto:tyler.woodleysolutions@gmail.com?subject=54-Day Novena Tracker Feedback" 
            className="text-indigo-600 hover:text-indigo-800 underline transition-colors"
            onClick={() => analytics.feedbackLinkClicked()}
          >
            Contact us
          </a>
        </p>
        <p className="text-gray-500 text-xs">
          © {currentYear} Woodley Solutions. All rights reserved.
        </p>
        <p className="text-gray-400 text-xs italic">
          Traditional prayers are in the public domain
        </p>
      </div>
    </footer>
  );
};