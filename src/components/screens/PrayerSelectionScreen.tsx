import React from 'react';
import { Calendar, Heart, BookOpen, Clock, Trophy, Flame, Sparkles, Info, Settings, History, MessageCircle, Tag } from 'lucide-react';
import { RosaryStreakData, NovenaState, ActiveNovena } from '../../types';
import { calculateCompletionPercentage } from '../../utils/novenaCalculations';
import { TOTAL_DAYS } from '../../constants/novena';
import { CHAPLET_INFO } from '../../constants/chaplets';
import { TrialBanner } from '../common/TrialBanner';
import { AppFooter } from '../common/AppFooter';
import { MyNovenas } from '../novenas/MyNovenas';
import { RecommendationsSection } from '../recommendations/RecommendationsSection';

interface PrayerSelectionScreenProps {
  novenaState: NovenaState;
  rosaryStreak: RosaryStreakData;
  activeNovenas: ActiveNovena[];
  onStartNovena: () => void;
  onContinueNovena: () => void;
  onPrayRosary: () => void;
  onPrayChaplet: () => void;
  onContinueIndividualNovena: (novenaId: string) => void;
  onStartNewNovena: () => void;
  onRemoveNovena?: (novenaId: string) => void;
  hasAccess: boolean;
  onUpgradeClick: () => void;
  onShow54DayNovenaInfo?: () => void;
  onShowNovenaInfo?: () => void;
  onShowRosaryInfo?: () => void;
  onShowChapletInfo?: () => void;
  onShowSettings?: () => void;
  onShowHistory?: () => void;
  onStartRecommendedNovena?: (novenaType: string, targetDate: string) => void;
  onStart54DayFromRecommendation?: (targetDate: string) => void;
}

export const PrayerSelectionScreen: React.FC<PrayerSelectionScreenProps> = ({
  novenaState,
  rosaryStreak,
  activeNovenas,
  onStartNovena,
  onContinueNovena,
  onPrayRosary,
  onPrayChaplet,
  onContinueIndividualNovena,
  onStartNewNovena,
  onRemoveNovena,
  hasAccess,
  onUpgradeClick,
  onShow54DayNovenaInfo,
  onShowNovenaInfo,
  onShowRosaryInfo,
  onShowChapletInfo,
  onShowSettings,
  onShowHistory,
  onStartRecommendedNovena,
  onStart54DayFromRecommendation
}) => {
  const { currentDay, completedDays, startDate } = novenaState;
  const completionPercentage = calculateCompletionPercentage(completedDays, TOTAL_DAYS);
  
  const isNovenaActive = !!startDate;
  const isNovenaComplete = completedDays.size === TOTAL_DAYS;

  const getTodaysDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysSinceLastPrayer = () => {
    if (!rosaryStreak.lastPrayerDate) return null;
    const lastDate = new Date(rosaryStreak.lastPrayerDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStreakStatus = () => {
    const daysSince = getDaysSinceLastPrayer();
    if (!daysSince) return { text: 'Start your prayer journey', color: 'text-gray-500' };
    if (daysSince === 0) return { text: 'Prayed today!', color: 'text-green-600' };
    if (daysSince === 1) return { text: 'Prayed yesterday', color: 'text-blue-600' };
    return { text: `${daysSince} days ago`, color: 'text-orange-600' };
  };

  const streakStatus = getStreakStatus();

  // Calculate history statistics
  const getHistoryStats = () => {
    const completedSessions = rosaryStreak.sessions.filter(s => s.completed);
    const recentSessions = completedSessions
      .filter(s => {
        const sessionDate = new Date(s.date);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return sessionDate >= thirtyDaysAgo;
      })
      .sort((a, b) => b.date.localeCompare(a.date));

    const withReflections = completedSessions.filter(s => s.reflection || s.insights || (s.gratitudes && s.gratitudes.length > 0)).length;
    const reflectionPercentage = completedSessions.length > 0 ? Math.round((withReflections / completedSessions.length) * 100) : 0;

    return {
      totalCompleted: completedSessions.length,
      recent30Days: recentSessions.length,
      reflectionPercentage,
      recentSessions: recentSessions.slice(0, 3) // Show last 3 sessions
    };
  };

  const historyStats = getHistoryStats();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="relative text-center mb-8">
        {/* Settings Button */}
        {onShowSettings && (
          <button
            onClick={onShowSettings}
            className="absolute top-0 right-0 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
            title="Settings"
          >
            <Settings className="w-6 h-6" />
          </button>
        )}
        
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          🌹 Ora
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">Rosary & Devotion Tracker</p>
        <p className="text-gray-600 dark:text-gray-300">{getTodaysDate()}</p>
      </div>

      {/* Trial Status Banner */}
      <TrialBanner onUpgradeClick={onUpgradeClick} />

      {/* 54-Day Novena Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-white" />
              <h2 className="text-xl font-semibold text-white">54-Day Novena to Our Lady</h2>
            </div>
            {onShow54DayNovenaInfo && (
              <button
                onClick={onShow54DayNovenaInfo}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                title="Learn about the 54-Day Novena"
              >
                <Info className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        </div>
        
        <div className="p-6">
          {isNovenaActive ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {completedDays.size}/{TOTAL_DAYS} days
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.round(completionPercentage)}% complete
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-gray-800 dark:text-white">
                    Day {currentDay}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentDay <= 27 ? 'Petition Phase' : 'Thanksgiving Phase'}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-4 transition-colors duration-300">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>

              {isNovenaComplete ? (
                <div className="text-center py-4">
                  <p className="text-green-600 dark:text-green-400 font-medium mb-2">
                    🎉 Novena Complete! Congratulations!
                  </p>
                  <button
                    onClick={onStartNovena}
                    className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Start New Novena
                  </button>
                </div>
              ) : (
                <button
                  onClick={hasAccess ? onContinueNovena : onUpgradeClick}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Continue Novena - Day {currentDay}
                  {!hasAccess && <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Premium</span>}
                </button>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Begin the traditional 54-day novena devotion to Our Lady of the Rosary. 
                27 days of petition followed by 27 days of thanksgiving.
              </p>
              <button
                onClick={hasAccess ? onStartNovena : onUpgradeClick}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 mx-auto"
              >
                <Calendar className="w-5 h-5" />
                Start 54-Day Novena
                {!hasAccess && <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded ml-2">Premium</span>}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Daily Rosary Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Daily Rosary</h2>
            </div>
            {onShowRosaryInfo && (
              <button
                onClick={onShowRosaryInfo}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                title="Learn about the Daily Rosary"
              >
                <Info className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                    {rosaryStreak.currentStreak}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">day streak</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-lg font-medium text-gray-800 dark:text-white">
                    {rosaryStreak.longestStreak}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">best streak</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                {rosaryStreak.totalPrayers}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">total prayers</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-gray-400" />
            <p className={`text-sm ${streakStatus.color} dark:${streakStatus.color.replace('text-', 'text-')}`}>
              {streakStatus.text}
            </p>
          </div>

          <button
            onClick={onPrayRosary}
            className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Pray Today's Rosary
          </button>
        </div>
      </div>

      {/* Novenas Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Novenas</h2>
            </div>
            <button
              onClick={onShowNovenaInfo}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              title="Learn about Novenas"
            >
              <Info className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <MyNovenas
            activeNovenas={activeNovenas}
            onContinueNovena={onContinueIndividualNovena}
            onStartNewNovena={onStartNewNovena}
            onRemoveNovena={onRemoveNovena}
          />
        </div>
      </div>

      {/* Liturgical Recommendations */}
      {(onStartRecommendedNovena && onStart54DayFromRecommendation) && (
        <RecommendationsSection
          activeNovenas={activeNovenas.map(n => n.type)}
          has54DayActive={!!novenaState.startDate}
          onStartNovena={onStartRecommendedNovena}
          onStart54DayNovena={onStart54DayFromRecommendation}
        />
      )}

      {/* Traditional Chaplets Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
        <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Traditional Chaplets</h2>
            </div>
            {onShowChapletInfo && (
              <button
                onClick={onShowChapletInfo}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                title="Learn about Traditional Chaplets"
              >
                <Info className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {Object.entries(CHAPLET_INFO).slice(0, 4).map(([key, chaplet]) => (
              <div
                key={key}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center transition-colors duration-300"
              >
                <div className="text-2xl mb-1">{chaplet.icon}</div>
                <div className="text-xs font-medium text-gray-800 dark:text-white mb-1">
                  {chaplet.name.replace('Chaplet of ', '').replace('Chaplet ', '')}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  ~{chaplet.estimatedDuration} min
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Divine Mercy • St. Michael • Sacred Heart • Seven Sorrows
            </p>
          </div>

          <button
            onClick={onPrayChaplet}
            className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Pray a Chaplet
          </button>
        </div>
      </div>

      {/* Prayer History Card */}
      {historyStats.totalCompleted > 0 && onShowHistory && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <History className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Prayer History & Journal</h2>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                  {historyStats.totalCompleted}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  completed prayers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  {historyStats.recent30Days}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  last 30 days
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {historyStats.reflectionPercentage}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  with reflections
                </div>
              </div>
            </div>

            {/* Recent Sessions Preview */}
            {historyStats.recentSessions.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Recent Prayers
                </h3>
                <div className="space-y-2">
                  {historyStats.recentSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-800 dark:text-white">
                            {session.prayerType === '54-day-novena' ? `54-Day Novena - Day ${session.currentDay}` :
                             session.prayerType === 'daily-rosary' ? `${session.mystery} Rosary` :
                             'Chaplet'}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(session.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        {session.intention && (
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3 text-red-400" />
                            <span>Intention</span>
                          </div>
                        )}
                        {session.reflection && (
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3 text-blue-400" />
                            <span>Reflection</span>
                          </div>
                        )}
                        {session.tags && session.tags.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Tag className="w-3 h-3 text-purple-400" />
                            <span>{session.tags.length}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={onShowHistory}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <History className="w-5 h-5" />
              View Full Prayer History
            </button>
          </div>
        </div>
      )}

      <AppFooter />
    </div>
  );
};