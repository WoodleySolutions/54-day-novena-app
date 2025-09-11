import React, { useState } from 'react';
import { BookOpen, Info, Settings } from 'lucide-react';
import { LearnMoreModal } from '../modals/LearnMoreModal';
import { SettingsModal } from '../modals/SettingsModal';
import { analytics } from '../../utils/analytics';

interface AppHeaderProps {
  onClearData?: () => void;
  onUpgradeClick?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onClearData, onUpgradeClick }) => {
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleLearnMoreClick = () => {
    setShowLearnMore(true);
    analytics.learnMoreOpened();
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  return (
    <>
      <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4 relative">
          <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">54-Day Novena Tracker</h1>
          <div className="flex items-center gap-1">
            <button
              onClick={handleLearnMoreClick}
              className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-full transition-colors"
              title="Learn about the 54-Day Novena"
            >
              <Info className="w-5 h-5" />
            </button>
            <button
              onClick={handleSettingsClick}
              className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-full transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Track your journey through 27 days of petition followed by 27 days of thanksgiving. 
          Each day includes the rosary with additional prayers.
        </p>
      </header>

      <LearnMoreModal 
        isOpen={showLearnMore}
        onClose={() => setShowLearnMore(false)}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onClearData={onClearData || (() => {})}
        onUpgradeClick={onUpgradeClick}
      />
    </>
  );
};