import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandablePrayerProps {
  prayerName: string;
  prayerText: string;
  className?: string;
  disableScroll?: boolean;
}

export const ExpandablePrayer: React.FC<ExpandablePrayerProps> = ({
  prayerName,
  prayerText,
  className = '',
  disableScroll = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className={`border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 transition-colors duration-300 ${className}`}>
      <button
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 rounded-lg"
      >
        <span className="font-medium text-gray-800 dark:text-gray-200">{prayerName}</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-3 pb-3 border-t border-gray-200 dark:border-gray-600 transition-colors duration-300">
          <div className={`pt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line italic ${!disableScroll ? 'max-h-96 overflow-y-auto' : ''}`}>
            {prayerText}
          </div>
        </div>
      )}
    </div>
  );
};