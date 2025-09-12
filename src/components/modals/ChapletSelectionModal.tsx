import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
import { ChapletType } from '../../types';
import { CHAPLET_INFO } from '../../constants/chaplets';
import { INDIVIDUAL_CHAPLET_INFO } from '../../constants/chapletInfo';
import { PrayerInfoModal } from './PrayerInfoModal';

interface ChapletSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChaplet: (chaplet: ChapletType) => void;
}

export const ChapletSelectionModal: React.FC<ChapletSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectChaplet
}) => {
  const [showChapletInfo, setShowChapletInfo] = useState(false);
  const [selectedChapletInfo, setSelectedChapletInfo] = useState<ChapletType | null>(null);

  if (!isOpen) return null;

  const handleChapletSelect = (chaplet: ChapletType) => {
    onSelectChaplet(chaplet);
  };

  const handleShowInfo = (e: React.MouseEvent, chaplet: ChapletType) => {
    e.stopPropagation(); // Prevent chaplet selection
    setSelectedChapletInfo(chaplet);
    setShowChapletInfo(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-600 to-violet-600 rounded-t-2xl p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl">
              ✨
            </div>
            <h2 className="text-2xl font-bold mb-2">Choose a Chaplet</h2>
            <p className="text-purple-100">
              Select a traditional Catholic chaplet to pray
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-3">
            {Object.entries(CHAPLET_INFO).map(([key, chaplet]) => (
              <button
                key={key}
                onClick={() => handleChapletSelect(key as ChapletType)}
                className="w-full bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg p-4 transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="text-3xl flex-shrink-0">
                    {chaplet.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {chaplet.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>{chaplet.estimatedDuration} min</span>
                          <span>•</span>
                          <span>{chaplet.beadCount} beads</span>
                        </div>
                        <button
                          onClick={(e) => handleShowInfo(e, key as ChapletType)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                          title={`Learn about ${chaplet.name}`}
                        >
                          <Info className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {chaplet.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="text-center">
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                <strong>About Chaplets</strong>
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-300">
                Chaplets are shorter devotional prayers often prayed using rosary beads. 
                Each chaplet has its own specific prayers and meditations, 
                offering different spiritual focuses for your prayer time.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Chaplet Info Modal */}
      {selectedChapletInfo && (
        <PrayerInfoModal
          isOpen={showChapletInfo}
          onClose={() => {
            setShowChapletInfo(false);
            setSelectedChapletInfo(null);
          }}
          prayerInfo={INDIVIDUAL_CHAPLET_INFO[selectedChapletInfo]}
        />
      )}
    </div>
  );
};