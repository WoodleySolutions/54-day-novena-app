import React, { useState, useEffect } from 'react';
import { AppScreen, MysteryType, ChapletType, RosarySession } from './types';
import { useSubscription } from './contexts/SubscriptionContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Screens and Modals
import { PrayerSelectionScreen } from './components/screens/PrayerSelectionScreen';
import NovenaTrackingScreen from './components/screens/NovenaTrackingScreen';
import { RosarySelectionModal } from './components/modals/RosarySelectionModal';
import { ChapletSelectionModal } from './components/modals/ChapletSelectionModal';
import { PrayerModal } from './components/modals/PrayerModal';
import { PaywallModal } from './components/modals/PaywallModal';
import { TrialWelcomeModal } from './components/modals/TrialWelcomeModal';
import { PrayerInfoModal } from './components/modals/PrayerInfoModal';

// Utilities
import { 
  loadRosaryStreakData, 
  saveRosaryStreakData, 
  createRosarySession, 
  createChapletSession,
  completeRosarySession 
} from './utils/rosaryStreak';
import { useNovenaState } from './hooks/useNovenaState';
import { initGA, analytics } from './utils/analytics';
import { initializeNotifications } from './utils/notifications';
import { NOVENA_INFO, ROSARY_INFO, CHAPLET_INFO } from './constants/prayerInfo';
import './utils/devHelpers'; // Load development utilities

const App: React.FC = () => {
  // Navigation state
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('selection');
  
  // Modal states
  const [showRosarySelection, setShowRosarySelection] = useState(false);
  const [showChapletSelection, setShowChapletSelection] = useState(false);
  const [showPrayerModal, setShowPrayerModal] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showNovenaInfo, setShowNovenaInfo] = useState(false);
  const [showRosaryInfo, setShowRosaryInfo] = useState(false);
  const [showChapletInfo, setShowChapletInfo] = useState(false);
  
  // Current prayer context
  const [currentPrayerSession, setCurrentPrayerSession] = useState<RosarySession | null>(null);
  
  // Rosary streak data
  const [rosaryStreakData, setRosaryStreakData] = useState(() => loadRosaryStreakData());
  
  // Subscription and Novena state
  const { hasAccess, hasSeenWelcome, startTrial, markWelcomeSeen } = useSubscription();
  const novenaState = useNovenaState();

  // Initialize app
  useEffect(() => {
    initGA();
    initializeNotifications();
    
    // Show welcome modal if first time user
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, [hasSeenWelcome]);

  // Save rosary streak data whenever it changes
  useEffect(() => {
    saveRosaryStreakData(rosaryStreakData);
  }, [rosaryStreakData]);

  // Navigation handlers
  const handleBackToSelection = () => {
    setCurrentScreen('selection');
  };

  const handleStartNovena = () => {
    if (!hasAccess) {
      setShowPaywall(true);
      return;
    }
    novenaState.startNovena();
    setCurrentScreen('novena');
    analytics.novenaStarted();
  };

  const handleContinueNovena = () => {
    if (!hasAccess) {
      setShowPaywall(true);
      return;
    }
    setCurrentScreen('novena');
  };

  const handlePrayRosary = () => {
    setShowRosarySelection(true);
  };


  const handlePrayChaplet = () => {
    setShowChapletSelection(true);
  };

  // Rosary selection handlers
  const handleRosaryMysterySelection = (mystery: MysteryType) => {
    const session = createRosarySession(mystery, 'daily-rosary');
    setCurrentPrayerSession(session);
    
    // Update streak data with new session
    setRosaryStreakData(prev => ({
      ...prev,
      sessions: [...prev.sessions, session]
    }));
    
    setShowRosarySelection(false);
    setShowPrayerModal(true);
    
    analytics.prayerModalOpened(1, mystery);
  };

  // Chaplet selection handlers
  const handleChapletSelection = (chaplet: ChapletType) => {
    const session = createChapletSession(chaplet);
    setCurrentPrayerSession(session);
    
    // Update streak data with new session
    setRosaryStreakData(prev => ({
      ...prev,
      sessions: [...prev.sessions, session]
    }));
    
    setShowChapletSelection(false);
    setShowPrayerModal(true);
    
    // Track chaplet prayer start
    console.log('Started chaplet prayer:', chaplet);
  };

  // Prayer completion handlers
  const handleRosaryPrayerComplete = () => {
    if (currentPrayerSession) {
      const updatedStreakData = completeRosarySession(
        currentPrayerSession.id,
        rosaryStreakData
      );
      setRosaryStreakData(updatedStreakData);
      // Only track mystery for rosary prayers, not chaplets
      if (currentPrayerSession.mystery) {
        analytics.prayerCompleted(1, currentPrayerSession.mystery);
      }
    }
    
    setShowPrayerModal(false);
    setCurrentPrayerSession(null);
  };


  // Modal handlers
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

  const handleClosePrayerModal = () => {
    setShowPrayerModal(false);
    setCurrentPrayerSession(null);
  };

  // Info modal handlers
  const handleShowNovenaInfo = () => {
    setShowNovenaInfo(true);
  };

  const handleShowRosaryInfo = () => {
    setShowRosaryInfo(true);
  };

  const handleShowChapletInfo = () => {
    setShowChapletInfo(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        
        {/* Main Screen Content */}
        {currentScreen === 'selection' && (
          <PrayerSelectionScreen
            novenaState={novenaState}
            rosaryStreak={rosaryStreakData}
            onStartNovena={handleStartNovena}
            onContinueNovena={handleContinueNovena}
            onPrayRosary={handlePrayRosary}
            onPrayChaplet={handlePrayChaplet}
            hasAccess={hasAccess}
            onUpgradeClick={handleUpgradeClick}
            onShowNovenaInfo={handleShowNovenaInfo}
            onShowRosaryInfo={handleShowRosaryInfo}
            onShowChapletInfo={handleShowChapletInfo}
          />
        )}

        {currentScreen === 'novena' && (
          <NovenaTrackingScreen
            onBackToSelection={handleBackToSelection}
            onUpgradeClick={handleUpgradeClick}
          />
        )}

        {/* Modals */}
        <RosarySelectionModal
          isOpen={showRosarySelection}
          onClose={() => setShowRosarySelection(false)}
          onSelectMystery={handleRosaryMysterySelection}
        />

        <ChapletSelectionModal
          isOpen={showChapletSelection}
          onClose={() => setShowChapletSelection(false)}
          onSelectChaplet={handleChapletSelection}
        />

        <PrayerModal
          isOpen={showPrayerModal}
          prayerType={currentPrayerSession?.prayerType || 'daily-rosary'}
          mystery={currentPrayerSession?.mystery}
          chaplet={currentPrayerSession?.chaplet}
          intention={currentPrayerSession?.intention}
          onClose={handleClosePrayerModal}
          onComplete={handleRosaryPrayerComplete}
        />

        <PaywallModal
          isOpen={showPaywall}
          onClose={handlePaywallClose}
          feature="full rosary companion features"
        />

        <TrialWelcomeModal
          isOpen={showWelcome}
          onStartTrial={handleWelcomeStartTrial}
          onSkip={handleWelcomeSkip}
        />

        {/* Prayer Info Modals */}
        <PrayerInfoModal
          isOpen={showNovenaInfo}
          onClose={() => setShowNovenaInfo(false)}
          prayerInfo={NOVENA_INFO}
        />

        <PrayerInfoModal
          isOpen={showRosaryInfo}
          onClose={() => setShowRosaryInfo(false)}
          prayerInfo={ROSARY_INFO}
        />

        <PrayerInfoModal
          isOpen={showChapletInfo}
          onClose={() => setShowChapletInfo(false)}
          prayerInfo={CHAPLET_INFO}
        />

      </div>
    </ThemeProvider>
  );
};

export default App;