import React, { useState } from 'react';
import { Calendar, Clock, Heart, MessageCircle, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { RosarySession, MysteryType } from '../../types';
import { CHAPLET_INFO } from '../../constants/chaplets';

interface HistoryCardProps {
  session: RosarySession;
  onClick?: () => void;
  showExpanded?: boolean;
}

const mysteryColors: Record<MysteryType, string> = {
  'Joyful': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
  'Sorrowful': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
  'Glorious': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
  'Luminous': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
};

const moodEmojis: Record<string, string> = {
  'peaceful': '😌',
  'joyful': '😊',
  'hopeful': '🌟',
  'troubled': '😟',
  'sorrowful': '😢'
};

const getPrayerTypeDisplay = (session: RosarySession): { name: string; color: string } => {
  switch (session.prayerType) {
    case '54-day-novena':
      return {
        name: `54-Day Novena${session.currentDay ? ` - Day ${session.currentDay}` : ''}`,
        color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200'
      };
    case 'daily-rosary':
      return {
        name: 'Daily Rosary',
        color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200'
      };
    case 'chaplet':
      return {
        name: session.chaplet ? CHAPLET_INFO[session.chaplet].name : 'Chaplet',
        color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-200'
      };
    default:
      return {
        name: 'Prayer',
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200'
      };
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;

  return date.toLocaleDateString();
};

const formatDuration = (minutes?: number): string => {
  if (!minutes) return 'Duration not recorded';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const HistoryCard: React.FC<HistoryCardProps> = ({
  session,
  onClick,
  showExpanded: initialExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const prayerType = getPrayerTypeDisplay(session);

  const hasJournalContent = session.intention || session.reflection ||
    (session.gratitudes && session.gratitudes.length > 0) ||
    session.insights || (session.tags && session.tags.length > 0);

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 ${
        onClick ? 'hover:shadow-md cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${prayerType.color}`}>
                {prayerType.name}
              </span>
              {session.mystery && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${mysteryColors[session.mystery]}`}>
                  {session.mystery} Mysteries
                </span>
              )}
              {!session.completed && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200">
                  Incomplete
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(session.date)}
              </div>
              {session.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatDuration(session.duration)}
                </div>
              )}
              {session.mood && (
                <div className="flex items-center gap-1">
                  <span>{moodEmojis[session.mood]}</span>
                  <span className="capitalize">{session.mood}</span>
                </div>
              )}
            </div>
          </div>

          {hasJournalContent && (
            <button
              onClick={toggleExpanded}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Intention Preview */}
        {session.intention && !isExpanded && (
          <div className="flex items-start gap-2 mb-2">
            <Heart className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {session.intention}
            </p>
          </div>
        )}

        {/* Tags Preview */}
        {session.tags && session.tags.length > 0 && !isExpanded && (
          <div className="flex flex-wrap gap-1 mt-2">
            {session.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-full"
              >
                #{tag}
              </span>
            ))}
            {session.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 rounded-full">
                +{session.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && hasJournalContent && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
          {/* Intention */}
          {session.intention && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-red-500" />
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Prayer Intention
                </h4>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 pl-6">
                {session.intention}
              </p>
            </div>
          )}

          {/* Reflection */}
          {session.reflection && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Reflection
                </h4>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 pl-6">
                {session.reflection}
              </p>
            </div>
          )}

          {/* Gratitudes */}
          {session.gratitudes && session.gratitudes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500">🙏</span>
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Gratitudes
                </h4>
              </div>
              <div className="pl-6 space-y-1">
                {session.gratitudes.map((gratitude, index) => (
                  <p key={index} className="text-sm text-gray-700 dark:text-gray-300">
                    • {gratitude}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Insights */}
          {session.insights && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-purple-500">💡</span>
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Spiritual Insights
                </h4>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 pl-6">
                {session.insights}
              </p>
            </div>
          )}

          {/* Tags */}
          {session.tags && session.tags.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-gray-500" />
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Tags
                </h4>
              </div>
              <div className="flex flex-wrap gap-1 pl-6">
                {session.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};