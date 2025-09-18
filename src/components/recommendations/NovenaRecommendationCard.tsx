import React from 'react';
import { Calendar, Clock, Heart, Star } from 'lucide-react';
import { NovenaRecommendation } from '../../types/liturgical';

interface NovenaRecommendationCardProps {
  recommendation: NovenaRecommendation;
  onStartNovena: (novenaType: string, targetDate: string) => void;
  onStart54DayNovena: (targetDate: string) => void;
  onDismiss?: (recommendationId: string) => void;
  className?: string;
}

export const NovenaRecommendationCard: React.FC<NovenaRecommendationCardProps> = ({
  recommendation,
  onStartNovena,
  onStart54DayNovena,
  onDismiss,
  className = ''
}) => {
  const handleStartClick = () => {
    if (recommendation.type === '54-day') {
      onStart54DayNovena(recommendation.targetFeast.date);
    } else if (recommendation.novenaType) {
      onStartNovena(recommendation.novenaType, recommendation.targetFeast.date);
    }
  };

  const getUrgencyStyles = () => {
    switch (recommendation.urgency) {
      case 'high':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20';
      case 'medium':
        return 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20';
      default:
        return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20';
    }
  };

  const getUrgencyTextColor = () => {
    switch (recommendation.urgency) {
      case 'high':
        return 'text-red-700 dark:text-red-300';
      case 'medium':
        return 'text-orange-700 dark:text-orange-300';
      default:
        return 'text-blue-700 dark:text-blue-300';
    }
  };

  const getUrgencyLabel = () => {
    switch (recommendation.urgency) {
      case 'high':
        return 'Starting Soon';
      case 'medium':
        return 'Starting This Week';
      default:
        return 'Upcoming';
    }
  };

  const getRankBadgeColor = () => {
    switch (recommendation.targetFeast.rank) {
      case 'SOLEMNITY':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200';
      case 'FEAST':
        return 'bg-gold-100 text-gold-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      case 'MEMORIAL':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysText = () => {
    if (recommendation.daysUntilStart === 0) return 'Start today';
    if (recommendation.daysUntilStart === 1) return 'Start tomorrow';
    return `Start in ${recommendation.daysUntilStart} days`;
  };

  return (
    <div className={`rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md ${getUrgencyStyles()} ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRankBadgeColor()}`}>
            {recommendation.targetFeast.rank.toLowerCase()}
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyTextColor()} bg-white dark:bg-gray-800`}>
            {getUrgencyLabel()}
          </div>
        </div>

        {onDismiss && (
          <button
            onClick={() => onDismiss(recommendation.id)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Dismiss recommendation"
          >
            ×
          </button>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className={`font-semibold text-lg mb-2 ${getUrgencyTextColor()}`}>
          {recommendation.type === '54-day' ? '54-Day Novena Opportunity' : `${recommendation.targetFeast.name} Novena`}
        </h3>

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
          {recommendation.message}
        </p>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>Feast: {formatDate(recommendation.targetFeast.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{getDaysText()}</span>
          </div>
          {recommendation.type === '54-day' && (
            <div className="flex items-center space-x-1 sm:col-span-2">
              <Star className="w-3 h-3" />
              <span>54 days of rosary mysteries ending on {recommendation.targetFeast.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleStartClick}
        className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] ${
          recommendation.urgency === 'high'
            ? 'bg-red-600 hover:bg-red-700'
            : recommendation.urgency === 'medium'
            ? 'bg-orange-600 hover:bg-orange-700'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <Heart className="w-4 h-4" />
        <span>
          {recommendation.type === '54-day'
            ? 'Start 54-Day Novena'
            : 'Start Novena'
          }
        </span>
      </button>
    </div>
  );
};