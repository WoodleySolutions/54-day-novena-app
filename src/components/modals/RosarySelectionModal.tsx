import React from 'react';
import { X, Sun, CloudRain, Crown, Sparkles, Calendar } from 'lucide-react';
import { MysteryType } from '../../types';

interface RosarySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMystery: (mystery: MysteryType) => void;
}

export const RosarySelectionModal: React.FC<RosarySelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectMystery
}) => {
  if (!isOpen) return null;

  const getTodaysMystery = (): MysteryType => {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    switch (today) {
      case 1: case 6: return 'Joyful';    // Monday, Saturday
      case 2: case 5: return 'Sorrowful'; // Tuesday, Friday  
      case 3: case 0: return 'Glorious';  // Wednesday, Sunday
      case 4: return 'Luminous';          // Thursday
      default: return 'Joyful';
    }
  };

  const getDayName = (mystery: MysteryType): string => {
    switch (mystery) {
      case 'Joyful': return 'Mondays & Saturdays';
      case 'Sorrowful': return 'Tuesdays & Fridays';
      case 'Glorious': return 'Wednesdays & Sundays';
      case 'Luminous': return 'Thursdays';
      default: return '';
    }
  };

  const getMysteryIcon = (mystery: MysteryType) => {
    switch (mystery) {
      case 'Joyful': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'Sorrowful': return <CloudRain className="w-8 h-8 text-red-500" />;
      case 'Glorious': return <Crown className="w-8 h-8 text-purple-500" />;
      case 'Luminous': return <Sparkles className="w-8 h-8 text-blue-500" />;
      default: return <Sun className="w-8 h-8 text-gray-500" />;
    }
  };

  const getMysteryColor = (mystery: MysteryType): string => {
    switch (mystery) {
      case 'Joyful': return 'from-yellow-500 to-orange-500';
      case 'Sorrowful': return 'from-red-500 to-rose-500';
      case 'Glorious': return 'from-purple-500 to-violet-500';
      case 'Luminous': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getMysteryDescription = (mystery: MysteryType): string => {
    switch (mystery) {
      case 'Joyful': return 'Celebrate the joyful events in the lives of Jesus and Mary';
      case 'Sorrowful': return 'Meditate on the suffering and passion of Our Lord';
      case 'Glorious': return 'Rejoice in the resurrection and triumph of Christ';
      case 'Luminous': return 'Contemplate the public ministry of Jesus Christ';
      default: return '';
    }
  };

  const todaysMystery = getTodaysMystery();
  const mysteries: MysteryType[] = ['Joyful', 'Sorrowful', 'Glorious', 'Luminous'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Choose Your Rosary</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Today's Mystery - Featured */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Today's Mystery</h3>
            </div>
            <button
              onClick={() => onSelectMystery(todaysMystery)}
              className={`w-full p-4 rounded-lg bg-gradient-to-r ${getMysteryColor(todaysMystery)} text-white hover:opacity-90 transition-all duration-200 transform hover:scale-105`}
            >
              <div className="flex items-center gap-4">
                {getMysteryIcon(todaysMystery)}
                <div className="text-left">
                  <h4 className="text-xl font-semibold">{todaysMystery} Mysteries</h4>
                  <p className="text-white text-opacity-90 text-sm">{getDayName(todaysMystery)}</p>
                  <p className="text-white text-opacity-80 text-sm mt-1">
                    {getMysteryDescription(todaysMystery)}
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* All Mystery Options */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">All Mysteries</h3>
            <div className="grid gap-3">
              {mysteries.map((mystery) => (
                <button
                  key={mystery}
                  onClick={() => onSelectMystery(mystery)}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="group-hover:scale-110 transition-transform duration-200">
                      {getMysteryIcon(mystery)}
                    </div>
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {mystery} Mysteries
                        </h4>
                        {mystery === todaysMystery && (
                          <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs px-2 py-1 rounded-full font-medium">
                            Today
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {getDayName(mystery)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {getMysteryDescription(mystery)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 <strong>Traditional Schedule:</strong> Catholics traditionally pray specific mysteries on certain days, 
              but you can choose any mystery based on your devotion and spiritual needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};