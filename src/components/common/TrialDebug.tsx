import React from 'react';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useNovenaState } from '../../hooks/useNovenaState';

interface TrialDebugProps {
  isVisible?: boolean;
}

export const TrialDebug: React.FC<TrialDebugProps> = ({ isVisible = false }) => {
  const trialState = useSubscription();
  const { startDate, intention, currentDay, completedDays } = useNovenaState();
  const [isDemoMode, setIsDemoMode] = React.useState(() => 
    localStorage.getItem('stripe-demo-mode') === 'true'
  );

  if (!isVisible) return null;

  const handleStartTrial = () => {
    trialState.startTrial();
  };

  const handleActivatePremium = () => {
    trialState.activatePremium();
  };

  const handleClearData = () => {
    // Clear trial data
    trialState.clearTrialData();
    
    // Clear novena data using the correct storage key
    localStorage.removeItem('novena-tracker-data');
    
    // Also clear any legacy keys that might exist
    localStorage.removeItem('novena-data');
    localStorage.removeItem('novena-start-date');
    localStorage.removeItem('novena-completed-days');
    localStorage.removeItem('novena-intention');
    
    // Force page reload to reset all state
    window.location.reload();
  };

  const handleSetExpiringSoon = () => {
    const startDate = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000);
    const endDate = new Date(Date.now() + 2 * 60 * 60 * 1000);
    
    localStorage.setItem('novena-trial-data', JSON.stringify({
      trialStartDate: startDate.toISOString(),
      trialEndDate: endDate.toISOString()
    }));
    window.location.reload();
  };

  const handleSetExpired = () => {
    const startDate = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
    const endDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
    
    localStorage.setItem('novena-trial-data', JSON.stringify({
      trialStartDate: startDate.toISOString(),
      trialEndDate: endDate.toISOString()
    }));
    window.location.reload();
  };

  const toggleDemoMode = () => {
    const newDemoMode = !isDemoMode;
    setIsDemoMode(newDemoMode);
    if (newDemoMode) {
      localStorage.setItem('stripe-demo-mode', 'true');
    } else {
      localStorage.removeItem('stripe-demo-mode');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-4 max-w-sm shadow-lg z-50">
      <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-3 text-sm">
        🔧 Trial Debug Panel
      </h3>
      
      <div className="space-y-2 text-xs">
        <div className="bg-yellow-200 dark:bg-yellow-800 p-2 rounded">
          <div className="font-medium text-yellow-900 dark:text-yellow-100">Trial State:</div>
          <div className="text-yellow-800 dark:text-yellow-200 text-xs space-y-1">
            <div>{trialState.isPremiumUser && "✅ Premium Active"}</div>
            <div>{trialState.isTrialActive && `⏰ Trial Active (${trialState.daysRemaining}d left)`}</div>
            <div>{trialState.isTrialExpired && "❌ Trial Expired"}</div>
            <div>{!trialState.isPremiumUser && !trialState.isTrialActive && !trialState.isTrialExpired && "🆕 No Trial Started"}</div>
            <div>HasAccess: {trialState.hasAccess ? "✅" : "❌"}</div>
            <div>HasSeenWelcome: {trialState.hasSeenWelcome ? "✅" : "❌"}</div>
          </div>
        </div>
        
        <div className="bg-yellow-200 dark:bg-yellow-800 p-2 rounded">
          <div className="font-medium text-yellow-900 dark:text-yellow-100">Novena State:</div>
          <div className="text-yellow-800 dark:text-yellow-200 text-xs space-y-1">
            <div>StartDate: {startDate ? startDate.toISOString().split('T')[0] : 'NULL'}</div>
            <div>CurrentDay: {currentDay || 'N/A'}</div>
            <div>CompletedDays: {completedDays ? completedDays.size : 0}/54</div>
            <div>Intention: {intention ? intention.substring(0, 30) + '...' : 'None'}</div>
          </div>
        </div>

        <div className="bg-yellow-200 dark:bg-yellow-800 p-2 rounded">
          <div className="font-medium text-yellow-900 dark:text-yellow-100">Stripe Mode:</div>
          <div className="text-yellow-800 dark:text-yellow-200 text-xs space-y-1">
            <div>Mode: {isDemoMode ? '🎭 Demo' : '💳 Production'}</div>
            <div>Environment: {process.env.NODE_ENV}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={handleStartTrial}
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
          >
            Start Trial
          </button>
          <button
            onClick={handleActivatePremium}
            className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded text-xs"
          >
            Activate Premium
          </button>
          <button
            onClick={handleSetExpiringSoon}
            className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded text-xs"
          >
            Set Expiring
          </button>
          <button
            onClick={handleSetExpired}
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
          >
            Set Expired
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-1">
          <button
            onClick={toggleDemoMode}
            className={`${isDemoMode 
              ? 'bg-purple-500 hover:bg-purple-600' 
              : 'bg-blue-500 hover:bg-blue-600'
            } text-white px-2 py-1 rounded text-xs`}
          >
            {isDemoMode ? '🎭 Switch to Production' : '💳 Switch to Demo'}
          </button>
          <button
            onClick={handleClearData}
            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
          >
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
};