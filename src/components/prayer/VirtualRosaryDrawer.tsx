import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { BeadChain } from './BeadChain';
import { getRosaryConfig, BeadSequence } from '../../constants/rosarySequences';

interface VirtualRosaryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  prayerType?: string;
  currentBeadIndex?: number;
  onBeadClick?: (beadIndex: number, bead: BeadSequence) => void;
}

export const VirtualRosaryDrawer: React.FC<VirtualRosaryDrawerProps> = ({
  isOpen,
  onClose,
  side = 'right',
  prayerType = 'rosary',
  currentBeadIndex = 0,
  onBeadClick
}) => {
  const [beadSequence, setBeadSequence] = useState<BeadSequence[]>([]);

  // Get the appropriate bead sequence for the prayer type
  useEffect(() => {
    const config = getRosaryConfig(prayerType);
    setBeadSequence(config.beadSequence);
  }, [prayerType]);
  return (
    <>
      {/* Backdrop - only on very small screens */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-10 z-40 sm:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div
        className={`
          fixed top-0 h-full w-20 bg-white dark:bg-gray-800 shadow-xl z-50
          transform transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-gray-600
          ${side === 'right' ? 'right-0' : 'left-0'}
          ${isOpen 
            ? 'translate-x-0' 
            : side === 'right' 
              ? 'translate-x-full' 
              : '-translate-x-full'
          }
        `}
      >
        {/* Close button at top */}
        <div className="absolute top-2 right-1 z-10">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close rosary drawer"
          >
            <X className="w-3 h-3 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Progress indicator */}
        {beadSequence.length > 0 && (
          <div className="absolute top-8 left-1 right-1 z-10">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-1 rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${Math.max(0, Math.min(100, ((currentBeadIndex + 1) / beadSequence.length) * 100))}%` 
                }}
              />
            </div>
            <div className="text-center mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {currentBeadIndex + 1}/{beadSequence.length}
              </span>
            </div>
          </div>
        )}

        {/* Interactive Bead Chain - Full height with proper scrolling */}
        <div className="h-full pt-16 pb-2 px-1">
          {beadSequence.length > 0 && (
            <BeadChain
              beadSequence={beadSequence}
              currentBeadIndex={currentBeadIndex}
              onBeadClick={onBeadClick || (() => {})}
            />
          )}
        </div>
      </div>
    </>
  );
};