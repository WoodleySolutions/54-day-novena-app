import React, { useState } from 'react';
import { X, Info, Calendar, Clock } from 'lucide-react';
import { NovenaType } from '../../types';
import { NOVENA_INFO } from '../../constants/novenas';

interface NovenaSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNovena: (novena: NovenaType) => void;
}

export const NovenaSelectionModal: React.FC<NovenaSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectNovena
}) => {
  const [showNovenaInfo, setShowNovenaInfo] = useState(false);
  const [selectedNovenaInfo, setSelectedNovenaInfo] = useState<NovenaType | null>(null);

  if (!isOpen) return null;

  const handleNovenaSelect = (novena: NovenaType) => {
    onSelectNovena(novena);
  };

  const handleShowInfo = (e: React.MouseEvent, novena: NovenaType) => {
    e.stopPropagation();
    setSelectedNovenaInfo(novena);
    setShowNovenaInfo(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">

        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl">
              🙏
            </div>
            <h2 className="text-2xl font-bold mb-2">Choose a Novena</h2>
            <p className="text-blue-100 text-sm">
              Nine days of dedicated prayer and reflection
            </p>
          </div>
        </div>

        {/* Novena List */}
        <div className="p-6">
          <div className="space-y-3">
            {Object.entries(NOVENA_INFO).map(([key, info]) => (
              <div
                key={key}
                onClick={() => handleNovenaSelect(key as NovenaType)}
                className="group relative bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl p-4 cursor-pointer transition-all duration-200 transform hover:scale-[1.02] border-l-4 border-transparent hover:border-blue-500 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-white shadow-md"
                      style={{ backgroundColor: info.color }}
                    >
                      {info.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {info.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                        {info.description}
                      </p>

                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>9 Days</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{info.estimatedDuration} min/day</span>
                        </div>
                        {info.feastDay && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Feast: {info.feastDay}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleShowInfo(e, key as NovenaType)}
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
                  >
                    <Info className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-3">
              <div className="text-blue-600 dark:text-blue-400 text-lg">ℹ️</div>
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-1">About Novenas</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  A novena is nine days of prayer for a specific intention. Once you start a novena,
                  it will appear in your "My Novenas" section for easy daily access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Novena Info Modal */}
      {showNovenaInfo && selectedNovenaInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div
              className="relative rounded-t-2xl p-6 text-white"
              style={{ backgroundColor: NOVENA_INFO[selectedNovenaInfo].color }}
            >
              <button
                onClick={() => setShowNovenaInfo(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl">
                  {NOVENA_INFO[selectedNovenaInfo].icon}
                </div>
                <h2 className="text-2xl font-bold mb-2">{NOVENA_INFO[selectedNovenaInfo].name}</h2>
                <p className="text-sm opacity-90">{NOVENA_INFO[selectedNovenaInfo].description}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {NOVENA_INFO[selectedNovenaInfo].patron && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Patron</h4>
                    <p className="text-gray-600 dark:text-gray-300">{NOVENA_INFO[selectedNovenaInfo].patron}</p>
                  </div>
                )}

                {NOVENA_INFO[selectedNovenaInfo].feastDay && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Feast Day</h4>
                    <p className="text-gray-600 dark:text-gray-300">{NOVENA_INFO[selectedNovenaInfo].feastDay}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Duration</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    9 days, approximately {NOVENA_INFO[selectedNovenaInfo].estimatedDuration} minutes per day
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowNovenaInfo(false);
                  handleNovenaSelect(selectedNovenaInfo);
                }}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                Start This Novena
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};