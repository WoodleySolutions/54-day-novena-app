import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Filter, Download } from 'lucide-react';
import { HistoryCard } from '../history/HistoryCard';
import { loadRosaryStreakData, searchSessions } from '../../utils/rosaryStreak';

interface PrayerHistoryScreenProps {
  onBack: () => void;
}

type FilterType = 'all' | '54-day-novena' | 'daily-rosary' | 'chaplet' | 'novena';
type TimeFilter = 'all' | 'week' | 'month' | 'year';

export const PrayerHistoryScreen: React.FC<PrayerHistoryScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [showFilters, setShowFilters] = useState(false);

  const streakData = loadRosaryStreakData();

  // Filter sessions based on current filters
  const filteredSessions = useMemo(() => {
    let sessions = streakData.sessions.filter(s => s.completed);

    // Apply prayer type filter
    if (filterType !== 'all') {
      sessions = sessions.filter(s => s.prayerType === filterType);
    }

    // Apply time filter
    if (timeFilter !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();

      switch (timeFilter) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      const cutoffString = cutoffDate.toISOString().split('T')[0];
      sessions = sessions.filter(s => s.date >= cutoffString);
    }

    // Apply search query
    if (searchQuery.trim()) {
      sessions = searchSessions({ ...streakData }, searchQuery.trim());
    } else {
      // Sort by date (most recent first)
      sessions.sort((a, b) => b.date.localeCompare(a.date));
    }

    return sessions;
  }, [streakData, filterType, timeFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const completed = streakData.sessions.filter(s => s.completed);
    const totalPrayers = completed.length;
    const thisMonth = completed.filter(s => {
      const sessionDate = new Date(s.date);
      const now = new Date();
      return sessionDate.getMonth() === now.getMonth() &&
             sessionDate.getFullYear() === now.getFullYear();
    }).length;

    const withReflections = completed.filter(s => s.reflection).length;
    const reflectionPercentage = totalPrayers > 0 ? Math.round((withReflections / totalPrayers) * 100) : 0;

    return {
      totalPrayers,
      thisMonth,
      reflectionPercentage
    };
  }, [streakData]);

  const exportHistory = () => {
    const exportData = filteredSessions.map(session => ({
      date: session.date,
      prayerType: session.prayerType,
      mystery: session.mystery,
      chaplet: session.chaplet,
      currentDay: session.currentDay,
      duration: session.duration,
      intention: session.intention,
      reflection: session.reflection,
      mood: session.mood,
      gratitudes: session.gratitudes?.join('; '),
      insights: session.insights,
      tags: session.tags?.join(', ')
    }));

    const csv = [
      // Header row
      Object.keys(exportData[0] || {}).join(','),
      // Data rows
      ...exportData.map(row =>
        Object.values(row).map(value =>
          typeof value === 'string' && value.includes(',') ? `"${value}"` : value || ''
        ).join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prayer-history-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Prayer History
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your spiritual journey and reflections
                </p>
              </div>
            </div>

            <button
              onClick={exportHistory}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {stats.totalPrayers}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Prayers
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.thisMonth}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                This Month
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {stats.reflectionPercentage}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                With Reflections
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search intentions, reflections, insights..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                  showFilters
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-700 dark:text-indigo-300'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prayer Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(['all', '54-day-novena', 'daily-rosary', 'chaplet', 'novena'] as FilterType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          filterType === type
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        {type === 'all' ? 'All' : type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time Range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'week', 'month', 'year'] as TimeFilter[]).map((time) => (
                      <button
                        key={time}
                        onClick={() => setTimeFilter(time)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          timeFilter === time
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        {time === 'all' ? 'All Time' : `Past ${time.charAt(0).toUpperCase() + time.slice(1)}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📿</div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
              {searchQuery ? 'No prayers found' : 'No prayer history yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery
                ? 'Try adjusting your search terms or filters.'
                : 'Your completed prayers with reflections will appear here.'
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                  setTimeFilter('all');
                }}
                className="mt-4 px-4 py-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredSessions.length} prayer{filteredSessions.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="space-y-3">
              {filteredSessions.map((session) => (
                <HistoryCard
                  key={session.id}
                  session={session}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};