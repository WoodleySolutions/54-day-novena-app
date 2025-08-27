import React from 'react';
import { Calendar, BookOpen, Clock } from 'lucide-react';
import { useNovenaState } from './hooks/useNovenaState';
import { IntentionModal } from './components/modals/IntentionModal';
import { ProgressBar } from './components/common/ProgressBar';
import { PhaseCard } from './components/NovenaTracker/PhaseCard';
import { DayButton } from './components/NovenaTracker/DayButton';
import { 
  getCurrentPhase, 
  getMysteryForDay, 
  getCycleInfo, 
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
    setIntention,
    markDayComplete,
    startNovena,
    closeIntentionModal
  } = useNovenaState();

  const completionPercentage = calculateCompletionPercentage(completedDays, TOTAL_DAYS);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Application Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">54-Day Novena Tracker</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track your journey through 27 days of petition followed by 27 days of thanksgiving. 
          Each day includes the rosary with additional prayers.
        </p>
      </div>

      {/* Progress Overview Section */}
      {startDate && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Your Progress</h2>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">{completedDays.size}/{TOTAL_DAYS}</div>
              <div className="text-sm text-gray-500">days completed</div>
            </div>
          </div>
          
          <ProgressBar percentage={completionPercentage} className="w-full bg-gray-200 rounded-full h-3 mb-4" />
          
          {/* User's Intention Display */}
          {intention && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Your Intention:</h3>
              <p className="text-gray-600 italic">"{intention}"</p>
            </div>
          )}
        </div>
      )}

      {/* Start Novena or Main Tracking Interface */}
      {!startDate ? (
        // Initial Start Screen
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <Calendar className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Begin Your 54-Day Novena</h3>
          <p className="text-gray-600 mb-6">
            Start your spiritual journey of prayer and devotion. Set your intention and 
            begin tracking your daily progress through both phases of this powerful novena.
          </p>
          <button 
            onClick={startNovena}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Start Novena
          </button>
        </div>
      ) : (
        <>
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
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Daily Progress</h3>
            
            {/* Cycle-by-Cycle Breakdown */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {(['petition', 'thanksgiving'] as const).map((phase, phaseIndex) => {
                const phaseStart = phase === 'petition' ? 1 : DAYS_PER_PHASE + 1;
                return (
                  <div key={phase}>
                    <h4 className="font-semibold text-gray-700 mb-3 capitalize">{phase} Phase</h4>
                    <div className="space-y-3">
                      {/* Display each 3-day cycle */}
                      {Array.from({length: 9}, (_, cycleIndex) => {
                        const cycleStart = phaseStart + (cycleIndex * 3);
                        const cycleDays = [cycleStart, cycleStart + 1, cycleStart + 2];
                        
                        return (
                          <div key={cycleIndex} className="border border-gray-200 rounded p-3">
                            <div className="text-sm font-medium text-gray-600 mb-2">
                              Cycle {cycleIndex + 1} (Days {cycleStart}-{cycleStart + 2})
                            </div>
                            <div className="flex gap-1">
                              {cycleDays.map((day, dayIndex) => (
                                <DayButton
                                  key={day}
                                  day={day}
                                  mystery={MYSTERY_ROTATION[dayIndex]}
                                  isCompleted={completedDays.has(day)}
                                  onClick={markDayComplete}
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

          {/* Today's Prayer Focus */}
          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-800">Today's Prayer Focus</h3>
            </div>
            
            <div className="space-y-4">
              {/* Daily Prayer Components */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-2">Daily Prayers Include:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• The Holy Rosary (5 decades)</li>
                  <li>• Opening prayers to the Sacred Heart</li>
                  <li>• Prayer for your specific intention</li>
                  <li>• Closing prayers of trust and surrender</li>
                </ul>
              </div>
              
              {/* Current Day Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`rounded-lg p-4 border-2 ${getPhaseInfo(getCurrentPhase(currentDay)).color}`}>
                  <h4 className="font-semibold mb-2">
                    Current Phase: {getPhaseInfo(getCurrentPhase(currentDay)).title}
                  </h4>
                  <p className="text-sm">
                    {getPhaseInfo(getCurrentPhase(currentDay)).description}
                  </p>
                </div>
                
                <div className={`rounded-lg p-4 border-2 ${getPhaseInfo(getCurrentPhase(currentDay)).color}`}>
                  <h4 className="font-semibold mb-2">
                    Today's Mysteries: {getMysteryForDay(currentDay)}
                  </h4>
                  <p className="text-sm">
                    {(() => {
                      const { cycle } = getCycleInfo(currentDay);
                      const dayInCycle = ((currentDay - 1) % 3) + 1;
                      return `Cycle ${cycle}, Day ${dayInCycle} of 3-day rotation`;
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <IntentionModal
        isOpen={showIntentionModal}
        intention={intention}
        onIntentionChange={setIntention}
        onClose={closeIntentionModal}
      />
    </div>
  );
};

export default NovenaTracker;