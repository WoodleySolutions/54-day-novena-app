import React, { useState, useEffect, useCallback } from 'react';
import { Lightbulb, Settings, ChevronRight, X } from 'lucide-react';
import { NovenaRecommendation } from '../../types/liturgical';
import { NovenaRecommendationCard } from './NovenaRecommendationCard';
import liturgicalCalendar from '../../utils/liturgicalCalendar';

interface RecommendationsSectionProps {
  activeNovenas: string[];
  has54DayActive: boolean;
  onStartNovena: (novenaType: string, targetDate: string) => void;
  onStart54DayNovena: (targetDate: string) => void;
  className?: string;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  activeNovenas,
  has54DayActive,
  onStartNovena,
  onStart54DayNovena,
  className = ''
}) => {
  const [recommendations, setRecommendations] = useState<NovenaRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const [showSettings, setShowSettings] = useState(false);

  const loadRecommendations = useCallback(async () => {
    try {
      setLoading(true);
      const recs = await liturgicalCalendar.getNovenaRecommendations(
        activeNovenas,
        has54DayActive
      );

      // Filter out dismissed recommendations
      const filteredRecs = recs.filter(rec => !dismissedIds.has(rec.id));
      setRecommendations(filteredRecs);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  }, [activeNovenas, has54DayActive, dismissedIds]);

  // Load recommendations
  useEffect(() => {
    loadRecommendations();
  }, [loadRecommendations]);

  const handleDismiss = (recommendationId: string) => {
    const newDismissed = new Set(dismissedIds);
    newDismissed.add(recommendationId);
    setDismissedIds(newDismissed);

    // Remove from current recommendations
    setRecommendations(prev => prev.filter(rec => rec.id !== recommendationId));
  };

  const handleToggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const visibleRecommendations = expanded ? recommendations : recommendations.slice(0, 1);

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null; // Don't show section if no recommendations
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 transition-colors duration-300 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-2 rounded-lg">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Liturgical Recommendations
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Based on upcoming feast days
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {recommendations.length > 1 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <span>{expanded ? 'Show Less' : `Show All (${recommendations.length})`}</span>
                <ChevronRight className={`w-3 h-3 transition-transform ${expanded ? 'rotate-90' : ''}`} />
              </button>
            )}

            <button
              onClick={handleToggleSettings}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Recommendation Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Recommendation Settings
            </h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Recommendations are based on the Roman Catholic liturgical calendar and appear automatically for upcoming feast days.
            Dismissed recommendations will return next year.
          </p>
        </div>
      )}

      {/* Recommendations */}
      <div className="p-4 space-y-4">
        {visibleRecommendations.map((recommendation) => (
          <NovenaRecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            onStartNovena={onStartNovena}
            onStart54DayNovena={onStart54DayNovena}
            onDismiss={handleDismiss}
          />
        ))}

        {!expanded && recommendations.length > 1 && (
          <div className="text-center">
            <button
              onClick={() => setExpanded(true)}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              +{recommendations.length - 1} more recommendation{recommendations.length - 1 !== 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};