import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandablePrayerProps {
  prayerName: string;
  prayerText: string;
  className?: string;
}

export const ExpandablePrayer: React.FC<ExpandablePrayerProps> = ({
  prayerName,
  prayerText,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className={`border border-gray-200 rounded-lg bg-gray-50 ${className}`}>
      <button
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-100 transition-colors rounded-lg"
      >
        <span className="font-medium text-gray-800">{prayerName}</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-3 pb-3 border-t border-gray-200">
          <div className="pt-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line italic">
            {prayerText}
          </div>
        </div>
      )}
    </div>
  );
};