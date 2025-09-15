import React, { useState, useEffect } from 'react';
import { AppScreen, MysteryType, ChapletType, RosarySession, MoodType, NovenaType, ActiveNovena } from './types';
import { useSubscription } from './contexts/SubscriptionContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Screens and Modals
import { PrayerSelectionScreen } from './components/screens/PrayerSelectionScreen';
import { PrayerHistoryScreen } from './components/screens/PrayerHistoryScreen';
import NovenaTrackingScreen from './components/screens/NovenaTrackingScreen';
import { RosarySelectionModal } from './components/modals/RosarySelectionModal';
import { ChapletSelectionModal } from './components/modals/ChapletSelectionModal';
import { NovenaSelectionModal } from './components/modals/NovenaSelectionModal';
import { NovenaModal } from './components/modals/NovenaModal';
import { PrayerModal } from './components/modals/PrayerModal';
import { PaywallModal } from './components/modals/PaywallModal';
import { TrialWelcomeModal } from './components/modals/TrialWelcomeModal';
import { PrayerInfoModal } from './components/modals/PrayerInfoModal';
import { SettingsModal } from './components/modals/SettingsModal';

// Utilities
import {
  loadRosaryStreakData,
  saveRosaryStreakData,
  createRosarySession,
  createChapletSession,
  completeRosarySession
} from './utils/rosaryStreak';
import {
  loadActiveNovenas,
  startNovena,
  completeNovenaDay,
  getNovenaById,
  removeNovena
} from './utils/novenaTracking';
import { useNovenaState } from './hooks/useNovenaState';
import { initGA, analytics } from './utils/analytics';
import { initializeNotifications } from './utils/notifications';
import { FIFTY_FOUR_DAY_NOVENA_INFO, NOVENA_INFO, ROSARY_INFO, CHAPLET_INFO } from './constants/prayerInfo';
import './utils/devHelpers'; // Load development utilities

const App: React.FC = () => {
  // Navigation state
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('selection');
  
  // Modal states
  const [showRosarySelection, setShowRosarySelection] = useState(false);
  const [showChapletSelection, setShowChapletSelection] = useState(false);
  const [showNovenaSelection, setShowNovenaSelection] = useState(false);
  const [showNovenaModal, setShowNovenaModal] = useState(false);
  const [showPrayerModal, setShowPrayerModal] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [show54DayNovenaInfo, setShow54DayNovenaInfo] = useState(false);
  const [showNovenaInfo, setShowNovenaInfo] = useState(false);
  const [showRosaryInfo, setShowRosaryInfo] = useState(false);
  const [showChapletInfo, setShowChapletInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Current prayer context
  const [currentPrayerSession, setCurrentPrayerSession] = useState<RosarySession | null>(null);
  const [currentNovena, setCurrentNovena] = useState<{ novenaId: string; novenaType: NovenaType; day: number } | null>(null);

  // Prayer data
  const [rosaryStreakData, setRosaryStreakData] = useState(() => loadRosaryStreakData());
  const [activeNovenas, setActiveNovenas] = useState<ActiveNovena[]>(() => loadActiveNovenas());
  
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

  // Novena handlers
  const handleStartNewNovena = () => {
    setShowNovenaSelection(true);
  };

  const handleContinueIndividualNovena = (novenaId: string) => {
    const novena = getNovenaById(novenaId);
    if (novena) {
      const nextDay = Math.min(novena.currentDay, 9);
      setCurrentNovena({
        novenaId: novena.id,
        novenaType: novena.type,
        day: nextDay
      });
      setShowNovenaModal(true);
    }
  };

  const handleNovenaSelection = (novenaType: NovenaType) => {
    const newNovena = startNovena(novenaType);
    setActiveNovenas(prev => [...prev, newNovena]);

    setCurrentNovena({
      novenaId: newNovena.id,
      novenaType: newNovena.type,
      day: 1
    });

    setShowNovenaSelection(false);
    setShowNovenaModal(true);
  };

  const handleRemoveNovena = (novenaId: string) => {
    const success = removeNovena(novenaId);
    if (success) {
      setActiveNovenas(prev => prev.filter(n => n.id !== novenaId));
    }
  };

  const handleNovenaComplete = (journalData?: {
    intention?: string;
    reflection?: string;
    mood?: MoodType;
    gratitudes?: string[];
    insights?: string;
    tags?: string[];
  }) => {
    if (currentNovena) {
      const result = completeNovenaDay(currentNovena.novenaId, currentNovena.day, journalData);
      if (result) {
        setActiveNovenas(prev =>
          prev.map(n => n.id === result.novena.id ? result.novena : n)
        );
      }
    }

    setCurrentNovena(null);
    setShowNovenaModal(false);
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
  const handleRosaryPrayerComplete = (journalData?: {
    intention?: string;
    reflection?: string;
    mood?: MoodType;
    gratitudes?: string[];
    insights?: string;
    tags?: string[];
  }) => {
    if (currentPrayerSession) {
      const updatedStreakData = completeRosarySession(
        currentPrayerSession.id,
        rosaryStreakData,
        undefined, // duration - could be calculated
        journalData
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
  const handleShow54DayNovenaInfo = () => {
    setShow54DayNovenaInfo(true);
  };

  const handleShowNovenaInfo = () => {
    setShowNovenaInfo(true);
  };

  const handleShowRosaryInfo = () => {
    setShowRosaryInfo(true);
  };

  const handleShowChapletInfo = () => {
    setShowChapletInfo(true);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleShowHistory = () => {
    setCurrentScreen('history');
  };

  const handleClearData = () => {
    // This would typically clear rosary streak data and novena data
    // For now, just console.log as a placeholder  
    console.log('Clear data requested');
    setShowSettings(false);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        
        {/* Main Screen Content */}
        {currentScreen === 'selection' && (
          <PrayerSelectionScreen
            novenaState={novenaState}
            rosaryStreak={rosaryStreakData}
            activeNovenas={activeNovenas}
            onStartNovena={handleStartNovena}
            onContinueNovena={handleContinueNovena}
            onPrayRosary={handlePrayRosary}
            onPrayChaplet={handlePrayChaplet}
            onContinueIndividualNovena={handleContinueIndividualNovena}
            onStartNewNovena={handleStartNewNovena}
            onRemoveNovena={handleRemoveNovena}
            hasAccess={hasAccess}
            onUpgradeClick={handleUpgradeClick}
            onShow54DayNovenaInfo={handleShow54DayNovenaInfo}
            onShowNovenaInfo={handleShowNovenaInfo}
            onShowRosaryInfo={handleShowRosaryInfo}
            onShowChapletInfo={handleShowChapletInfo}
            onShowSettings={handleShowSettings}
            onShowHistory={handleShowHistory}
          />
        )}

        {currentScreen === 'novena' && (
          <NovenaTrackingScreen
            onBackToSelection={handleBackToSelection}
            onUpgradeClick={handleUpgradeClick}
          />
        )}

        {currentScreen === 'history' && (
          <PrayerHistoryScreen
            onBack={handleBackToSelection}
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

        <NovenaSelectionModal
          isOpen={showNovenaSelection}
          onClose={() => setShowNovenaSelection(false)}
          onSelectNovena={handleNovenaSelection}
        />

        {currentNovena && (
          <NovenaModal
            isOpen={showNovenaModal}
            novenaType={currentNovena.novenaType}
            novenaId={currentNovena.novenaId}
            currentDay={currentNovena.day}
            existingIntention={activeNovenas.find(n => n.id === currentNovena.novenaId)?.intention}
            onClose={() => {
              setShowNovenaModal(false);
              setCurrentNovena(null);
            }}
            onComplete={handleNovenaComplete}
          />
        )}

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
          isOpen={show54DayNovenaInfo}
          onClose={() => setShow54DayNovenaInfo(false)}
          prayerInfo={FIFTY_FOUR_DAY_NOVENA_INFO}
        />

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

        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onClearData={handleClearData}
          onUpgradeClick={handleUpgradeClick}
        />

      </div>
    </ThemeProvider>
  );
};

export default App;