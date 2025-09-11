import React, { useEffect, useState } from 'react';
import { Calendar, Heart } from 'lucide-react';
import { useNovenaState } from './hooks/useNovenaState';
import { useSubscription } from './contexts/SubscriptionContext';
import { IntentionModal } from './components/modals/IntentionModal';
import { PrayerModal } from './components/modals/PrayerModal';
import { PaywallModal } from './components/modals/PaywallModal';
import { TrialWelcomeModal } from './components/modals/TrialWelcomeModal';
import { AppHeader } from './components/common/AppHeader';
import { AppFooter } from './components/common/AppFooter';
import { ProgressBar } from './components/common/ProgressBar';
import { PhaseCard } from './components/NovenaTracker/PhaseCard';
import { DayButton } from './components/NovenaTracker/DayButton';
import { TrialBanner } from './components/common/TrialBanner';
import { initGA, analytics } from './utils/analytics';
import { initializeNotifications } from './utils/notifications';
import { StorageDebug } from './components/common/StorageDebug';
import { TrialDebug } from './components/common/TrialDebug';
import { PremiumGuard } from './components/common/PremiumGuard';
import { ThemeProvider } from './contexts/ThemeContext';
import { 
  getCurrentPhase, 
  getMysteryForDay, 
  calculateCompletionPercentage 
} from './utils/novenaCalculations';
import { getPhaseInfo } from './utils/phaseInfo';
import { TOTAL_DAYS, DAYS_PER_PHASE, MYSTERY_ROTATION } from './constants/novena';

const NovenaTracker: React.FC = () => {
  const {
    currentDay,
    completedDays,
    startDate,
    intention,
    showIntentionModal,
    showPrayerModal,
    setIntention,
    markDayComplete,
    startNovena,
    closeIntentionModal,
    openPrayerModal,
    closePrayerModal,
    completeTodaysPrayer,
    clearAllData
  } = useNovenaState();

  const { hasAccess, hasSeenWelcome, startTrial, markWelcomeSeen } = useSubscription();
  const [showPaywall, setShowPaywall] = useState(false);
  const [showWelcome, setShowWelcome] = useState(!hasSeenWelcome);

  // Initialize Google Analytics and notifications on component mount
  useEffect(() => {
    initGA();
    initializeNotifications();
  }, []);

  const completionPercentage = calculateCompletionPercentage(completedDays, TOTAL_DAYS);

  // Enhanced handlers with analytics tracking
  const handleStartNovena = () => {
    // Check if user has access (trial or premium)
    if (!hasAccess) {
      setShowPaywall(true);
      return;
    }
    
    startNovena();
    analytics.novenaStarted();
  };

  const handleUpgradeClick = () => {
    setShowPaywall(true);
  };

  const handlePaywallClose = () => {
    setShowPaywall(false);
  };

  const handleWelcomeStartTrial = () => {
    startTrial();
    markWelcomeSeen();
    setShowWelcome(false);
  };

  const handleWelcomeSkip = () => {
    markWelcomeSeen();
    setShowWelcome(false);
  };

  const handleOpenPrayerModal = () => {
    const mystery = getMysteryForDay(currentDay);
    openPrayerModal();
    analytics.prayerModalOpened(currentDay, mystery);
  };

  const handleDayComplete = (dayNumber: number) => {
    const phase = getCurrentPhase(dayNumber);
    markDayComplete(dayNumber);
    analytics.dayCompleted(dayNumber, phase);
    
    // Check if novena is completed
    if (completedDays.size + 1 === TOTAL_DAYS) {
      analytics.novenaCompleted();
    }
  };

  const handlePrayerComplete = () => {
    const mystery = getMysteryForDay(currentDay);
    completeTodaysPrayer();
    analytics.prayerCompleted(currentDay, mystery);
  };

  return (
    <ThemeProvider> {/* Updated to use new SubscriptionContext */}
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300">
      <AppHeader onClearData={clearAllData} onUpgradeClick={handleUpgradeClick} />
      
      {/* Trial Status Banner */}
      <TrialBanner onUpgradeClick={handleUpgradeClick} />

      {/* Progress Overview Section */}
      {startDate && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Your Progress</h2>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{completedDays.size}/{TOTAL_DAYS}</div>
              <div className="text-sm text-gray-500 dark:text-gray-300">days completed</div>
            </div>
          </div>
          
          <ProgressBar percentage={completionPercentage} className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-4 transition-colors duration-300" />
          
          {/* User's Intention Display */}
          {intention && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Your Intention:</h3>
              <p className="text-gray-600 dark:text-gray-300 italic">"{intention}"</p>
            </div>
          )}
          
          {/* Phase Breakdown Analytics - Available to all trial/paid users */}
          {hasAccess && (
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg p-4 mt-4 border border-indigo-200 dark:border-indigo-700">
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Your Progress Breakdown</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {Array.from(completedDays).filter(day => day <= 27).length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Petition Days</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {Array.from(completedDays).filter(day => day > 27).length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Thanksgiving Days</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {Math.round((completedDays.size / TOTAL_DAYS) * 100)}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Complete</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pray Today's Novena Button */}
      {startDate && (
        <PremiumGuard 
          feature="daily prayer guidance" 
          onUpgradeClick={handleUpgradeClick}
        >
          <div className="text-center mb-6">
            <button
              onClick={handleOpenPrayerModal}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
              <Heart className="w-6 h-6" />
              Pray Today's Novena
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                Day {currentDay}
              </span>
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {getMysteryForDay(currentDay)} Mysteries • {getPhaseInfo(getCurrentPhase(currentDay)).title}
            </p>
          </div>
        </PremiumGuard>
      )}


      {/* Start Novena or Main Tracking Interface */}
      {!startDate ? (
        // Initial Start Screen
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center transition-colors duration-300">
          <Calendar className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Begin Your 54-Day Novena</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Start your spiritual journey of prayer and devotion. Set your intention and 
            begin tracking your daily progress through both phases of this powerful novena.
          </p>
          <button 
            onClick={handleStartNovena}
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Start Novena
          </button>
        </div>
      ) : (
        <PremiumGuard 
          feature="54-day novena tracking" 
          onUpgradeClick={handleUpgradeClick}
        >
          {/* Phase Overview Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <PhaseCard
              phase="petition"
              phaseCompleted={Array.from({length: DAYS_PER_PHASE}, (_, i) => i + 1)
                .filter(day => completedDays.has(day)).length}
              totalDays={DAYS_PER_PHASE}
              startDay={1}
              endDay={DAYS_PER_PHASE}
            />
            <PhaseCard
              phase="thanksgiving"
              phaseCompleted={Array.from({length: DAYS_PER_PHASE}, (_, i) => i + DAYS_PER_PHASE + 1)
                .filter(day => completedDays.has(day)).length}
              totalDays={DAYS_PER_PHASE}
              startDay={DAYS_PER_PHASE + 1}
              endDay={TOTAL_DAYS}
            />
          </div>

          {/* Detailed Daily Progress Grid */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Daily Progress</h3>
            
            {/* Cycle-by-Cycle Breakdown */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {(['petition', 'thanksgiving'] as const).map((phase, phaseIndex) => {
                const phaseStart = phase === 'petition' ? 1 : DAYS_PER_PHASE + 1;
                return (
                  <div key={phase}>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 capitalize">{phase} Phase</h4>
                    <div className="space-y-3">
                      {/* Display each 3-day cycle */}
                      {Array.from({length: 9}, (_, cycleIndex) => {
                        const cycleStart = phaseStart + (cycleIndex * 3);
                        const cycleDays = [cycleStart, cycleStart + 1, cycleStart + 2];
                        
                        return (
                          <div key={cycleIndex} className="border border-gray-200 dark:border-gray-600 rounded p-3 transition-colors duration-300">
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                              Cycle {cycleIndex + 1} (Days {cycleStart}-{cycleStart + 2})
                            </div>
                            <div className="flex gap-1">
                              {cycleDays.map((day, dayIndex) => (
                                <DayButton
                                  key={day}
                                  day={day}
                                  mystery={MYSTERY_ROTATION[dayIndex]}
                                  isCompleted={completedDays.has(day)}
                                  onClick={handleDayComplete}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </PremiumGuard>
      )}

      <IntentionModal
        isOpen={showIntentionModal}
        intention={intention}
        onIntentionChange={setIntention}
        onClose={closeIntentionModal}
      />

      <PrayerModal
        isOpen={showPrayerModal}
        currentDay={currentDay}
        mystery={getMysteryForDay(currentDay)}
        phase={getCurrentPhase(currentDay)}
        intention={intention}
        onClose={closePrayerModal}
        onComplete={handlePrayerComplete}
      />

      <PaywallModal
        isOpen={showPaywall}
        onClose={handlePaywallClose}
        feature="the 54-day novena tracker"
      />

      <TrialWelcomeModal
        isOpen={showWelcome}
        onStartTrial={handleWelcomeStartTrial}
        onSkip={handleWelcomeSkip}
      />

      {/* Debug components - only show in development */}
      <StorageDebug isVisible={process.env.NODE_ENV === 'development'} />
      <TrialDebug isVisible={process.env.NODE_ENV === 'development'} />
      
        <AppFooter />
      </div>
    </ThemeProvider>
  );
};

export default NovenaTracker;