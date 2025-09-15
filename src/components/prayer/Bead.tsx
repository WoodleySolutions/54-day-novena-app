import React from 'react';
import { BeadSequence } from '../../constants/rosarySequences';
import { hapticFeedback, useHapticPreference } from '../../utils/hapticFeedback';

interface BeadProps {
  bead: BeadSequence;
  index: number;
  isActive: boolean;
  isPast: boolean;
  onClick: () => void;
}

export const Bead: React.FC<BeadProps> = ({
  bead,
  index,
  isActive,
  isPast,
  onClick
}) => {
  const hapticEnabled = useHapticPreference();
  
  const handleClick = () => {
    // Trigger haptic feedback based on bead type and state
    if (hapticEnabled) {
      if (bead.type === 'cross') {
        hapticFeedback.transition();
      } else if (bead.type === 'medal') {
        hapticFeedback.stepComplete();
      } else if (bead.type === 'large-bead') {
        hapticFeedback.beadSelect();
      } else {
        hapticFeedback.beadTap();
      }
    }
    
    onClick();
  };
  const getBeadStyles = () => {
    const baseClasses = 'cursor-pointer transition-all duration-500 shadow-sm hover:shadow-md transform hover:scale-105 flex-shrink-0 relative';
    
    // Enhanced visual states
    let stateClasses = '';
    if (isActive) {
      stateClasses = 'ring-4 ring-yellow-400 ring-opacity-60 scale-110 shadow-xl animate-pulse';
    } else if (isPast) {
      stateClasses = 'opacity-60 scale-95 ring-2 ring-green-400 ring-opacity-40';
    } else {
      stateClasses = 'opacity-75 hover:opacity-100';
    }
    
    // Enhanced gradients and visual feedback
    switch (bead.type) {
      case 'cross':
        const crossGradient = isPast ? 'from-green-400 to-green-600' : 
                             isActive ? 'from-yellow-400 to-orange-500' : 
                             'from-amber-400 to-amber-600';
        return `${baseClasses} ${stateClasses} w-10 h-12 bg-gradient-to-b ${crossGradient} rounded-sm flex flex-col items-center justify-center`;
      
      case 'large-bead':
        const largeGradient = isPast ? 'from-green-400 to-green-600' : 
                             isActive ? 'from-blue-300 to-blue-500' : 
                             'from-blue-400 to-blue-600';
        return `${baseClasses} ${stateClasses} w-7 h-7 bg-gradient-to-br ${largeGradient} rounded-full`;
      
      case 'small-bead':
        const smallGradient = isPast ? 'from-green-400 to-green-600' : 
                             isActive ? 'from-rose-300 to-rose-500' : 
                             'from-rose-400 to-rose-600';
        return `${baseClasses} ${stateClasses} w-5 h-5 bg-gradient-to-br ${smallGradient} rounded-full`;
      
      case 'medal':
        const medalGradient = isPast ? 'from-green-400 to-green-600' : 
                             isActive ? 'from-yellow-300 to-yellow-500' : 
                             'from-yellow-400 to-yellow-600';
        return `${baseClasses} ${stateClasses} w-8 h-8 bg-gradient-to-br ${medalGradient} rounded-full flex items-center justify-center`;
      
      default:
        return `${baseClasses} ${stateClasses} w-5 h-5 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full`;
    }
  };

  const renderBeadContent = () => {
    switch (bead.type) {
      case 'cross':
        return (
          <div className="text-white relative flex items-center justify-center w-8 h-10">
            {/* Vertical bar (full height) */}
            <div className="absolute w-1.5 h-8 bg-white rounded-sm"></div>
            {/* Horizontal bar (positioned in upper third) */}
            <div className="absolute w-6 h-1.5 bg-white rounded-sm" style={{ top: '25%' }}></div>
          </div>
        );
      
      case 'medal':
        return <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>;
      
      default:
        return null;
    }
  };


  return (
    <button
      onClick={handleClick}
      className={getBeadStyles()}
      title={bead.label || `${bead.type} - ${bead.prayers.join(', ')}`}
      aria-label={bead.label || `${bead.type} bead for ${bead.prayers.join(' and ')}`}
    >
      {renderBeadContent()}
      
      {/* Completion checkmark for completed beads */}
      {isPast && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
          ✓
        </div>
      )}
      
      {/* Active bead pulse effect */}
      {isActive && (
        <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-20 animate-ping" />
      )}
    </button>
  );
};