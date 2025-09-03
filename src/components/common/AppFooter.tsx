import React, { useState } from 'react';
import { analytics } from '../../utils/analytics';

export const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [showEmailCopied, setShowEmailCopied] = useState(false);

  const handleContactClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    analytics.feedbackLinkClicked();
    
    // For better UX, also copy email to clipboard when clicked
    try {
      await navigator.clipboard.writeText('tyler.woodleysolutions@gmail.com');
      setShowEmailCopied(true);
      setTimeout(() => setShowEmailCopied(false), 3000);
    } catch (err) {
      // Clipboard failed, that's okay - mailto will still work
      console.log('Could not copy to clipboard, but mailto should still work');
    }
    
    // Let the mailto link work normally
    // Don't prevent default - let the browser handle the mailto
  };

  return (
    <footer className="mt-12 text-center py-6 border-t border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 transition-colors duration-300">
      <div className="space-y-2">
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Developed with devotion by{' '}
          <a 
            href="https://www.woodleysolutions.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Woodley Solutions
          </a>
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          Have feedback or suggestions?{' '}
          <a 
            href="mailto:tyler.woodleysolutions@gmail.com?subject=54-Day Novena Tracker Feedback" 
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline transition-colors"
            onClick={handleContactClick}
            title="Click to open your email app or copy email address"
          >
            Contact us
          </a>
          {showEmailCopied && (
            <span className="ml-2 text-green-600 dark:text-green-400 text-xs">
              📋 Email copied to clipboard!
            </span>
          )}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          © {currentYear} Woodley Solutions. All rights reserved.
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs italic">
          Traditional prayers are in the public domain
        </p>
      </div>
    </footer>
  );
};