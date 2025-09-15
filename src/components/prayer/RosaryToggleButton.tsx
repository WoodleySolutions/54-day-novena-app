import React from 'react';

interface RosaryToggleButtonProps {
  onClick: () => void;
  isOpen?: boolean;
  side?: 'left' | 'right';
  className?: string;
}

export const RosaryToggleButton: React.FC<RosaryToggleButtonProps> = ({
  onClick,
  isOpen = false,
  side = 'right',
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center p-2 rounded-lg
        bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600
        text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white
        transition-all duration-200 ease-in-out
        ${isOpen ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400' : ''}
        ${className}
      `}
      title={`${isOpen ? 'Close' : 'Open'} virtual rosary`}
      aria-label={`${isOpen ? 'Close' : 'Open'} virtual rosary drawer`}
    >
      {/* Rosary icon - simplified representation */}
      <div className="relative">
        {/* Cross */}
        <div className="w-4 h-4 flex items-center justify-center">
          <div className="w-2 h-3 relative">
            {/* Vertical bar */}
            <div className="absolute inset-x-0 top-0 w-0.5 h-3 bg-current mx-auto"></div>
            {/* Horizontal bar */}
            <div className="absolute top-0.5 inset-x-0 w-2 h-0.5 bg-current"></div>
          </div>
        </div>
        
        {/* Small beads indicator */}
        <div className="flex items-center justify-center mt-1">
          <div className="w-1 h-1 bg-current rounded-full"></div>
          <div className="w-0.5 h-2 bg-current mx-0.5"></div>
          <div className="w-1 h-1 bg-current rounded-full"></div>
        </div>
      </div>
      
      {/* Slide indicator */}
      {side === 'right' && (
        <div className="ml-1 w-1 h-4 flex flex-col justify-center">
          <div className={`w-1 h-2 bg-current transition-transform duration-200 ${isOpen ? '-translate-x-0.5' : 'translate-x-0'}`}></div>
        </div>
      )}
      {side === 'left' && (
        <div className="mr-1 w-1 h-4 flex flex-col justify-center">
          <div className={`w-1 h-2 bg-current transition-transform duration-200 ${isOpen ? 'translate-x-0.5' : '-translate-x-0'}`}></div>
        </div>
      )}
    </button>
  );
};