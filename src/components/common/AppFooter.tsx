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
    <footer className="mt-12 text-center py-6 border-t border-gray-200 bg-white/50">
      <div className="space-y-2">
        <p className="text-gray-600 text-sm">
          Developed with devotion by{' '}
          <a 
            href="https://www.woodleysolutions.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors"
          >
            Woodley Solutions
          </a>
        </p>
        <p className="text-gray-500 text-xs">
          Have feedback or suggestions?{' '}
          <a 
            href="mailto:tyler.woodleysolutions@gmail.com?subject=54-Day Novena Tracker Feedback" 
            className="text-indigo-600 hover:text-indigo-800 underline transition-colors"
            onClick={handleContactClick}
            title="Click to open your email app or copy email address"
          >
            Contact us
          </a>
          {showEmailCopied && (
            <span className="ml-2 text-green-600 text-xs">
              📋 Email copied to clipboard!
            </span>
          )}
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