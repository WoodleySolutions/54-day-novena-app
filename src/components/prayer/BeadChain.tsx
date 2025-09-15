import React from 'react';
import { Bead } from './Bead';
import { BeadSequence } from '../../constants/rosarySequences';

interface BeadChainProps {
  beadSequence: BeadSequence[];
  currentBeadIndex: number;
  onBeadClick: (beadIndex: number, bead: BeadSequence) => void;
}

export const BeadChain: React.FC<BeadChainProps> = ({
  beadSequence,
  currentBeadIndex,
  onBeadClick
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isManualScrollingRef = React.useRef(false);

  // Handle bead click with scroll management
  const handleBeadClick = (index: number, bead: any) => {
    isManualScrollingRef.current = true;
    onBeadClick(index, bead);
    
    // Reset the flag after a short delay to allow auto-scroll to resume
    setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 1000);
  };

  // Auto-scroll to show current bead, starting from bottom
  React.useEffect(() => {
    if (containerRef.current && !isManualScrollingRef.current && beadSequence.length > 0) {
      const container = containerRef.current;
      
      // Find the actual DOM element for the current bead
      const beadElements = container.querySelectorAll('[data-bead-index]');
      const currentBeadElement = beadElements[currentBeadIndex] as HTMLElement;
      
      if (currentBeadElement) {
        // Scroll to center the current bead in the view
        const containerRect = container.getBoundingClientRect();
        const beadRect = currentBeadElement.getBoundingClientRect();
        
        const beadOffsetFromTop = currentBeadElement.offsetTop;
        const containerCenter = containerRect.height / 2;
        const beadCenter = beadRect.height / 2;
        
        const targetScrollTop = beadOffsetFromTop - containerCenter + beadCenter;
        
        // Enhanced smooth scrolling with easing
        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
        
        // Add a subtle visual feedback when auto-scrolling
        if (currentBeadElement) {
          currentBeadElement.style.transform = 'scale(1.1)';
          setTimeout(() => {
            if (currentBeadElement) {
              currentBeadElement.style.transform = '';
            }
          }, 300);
        }
      }
    }
  }, [currentBeadIndex, beadSequence.length]);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col-reverse items-center space-y-reverse space-y-3 h-full overflow-y-auto px-1 scrollbar-hide pb-4 pt-4"
      style={{ 
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none'  // IE/Edge
      }}
    >
      {beadSequence.map((bead, index) => (
        <div key={bead.id} data-bead-index={index}>
          <Bead
            bead={bead}
            index={index}
            isActive={index === currentBeadIndex}
            isPast={index < currentBeadIndex}
            onClick={() => handleBeadClick(index, bead)}
          />
        </div>
      ))}
    </div>
  );
};