import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, Bug, RotateCcw, Settings, Eye } from 'lucide-react';
import { NovenaRecommendation, LiturgicalFeast } from '../../types/liturgical';
import liturgicalCalendar from '../../utils/liturgicalCalendar';
import { NovenaRecommendationCard } from '../recommendations/NovenaRecommendationCard';

interface LiturgicalDebugPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onStartNovena: (novenaType: string, targetDate: string) => void;
  onStart54DayNovena: (targetDate: string) => void;
}

export const LiturgicalDebugPanel: React.FC<LiturgicalDebugPanelProps> = ({
  isOpen,
  onClose,
  onStartNovena,
  onStart54DayNovena
}) => {
  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toISOString().split('T')[0]
  );
  const [activeNovenas, setActiveNovenas] = useState<string[]>([]);
  const [has54DayActive, setHas54DayActive] = useState(false);
  const [recommendations, setRecommendations] = useState<NovenaRecommendation[]>([]);
  const [feasts, setFeasts] = useState<LiturgicalFeast[]>([]);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState(() => liturgicalCalendar.getConfig());

  const loadDebugData = useCallback(async () => {
    setLoading(true);
    try {
      // Temporarily override current date for testing
      const originalDate = Date.now;
      Date.now = () => new Date(selectedDate).getTime();

      // Get recommendations for the selected date
      const recs = await liturgicalCalendar.getNovenaRecommendations(
        activeNovenas,
        has54DayActive
      );
      setRecommendations(recs);

      // Get upcoming feasts for context
      const year = new Date(selectedDate).getFullYear();
      const allFeasts = await liturgicalCalendar.getFeasts(year);
      const today = new Date(selectedDate);
      const upcoming = allFeasts.filter(feast => {
        const feastDate = new Date(feast.date);
        const daysDiff = Math.ceil((feastDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return daysDiff >= 0 && daysDiff <= 60; // Show next 60 days
      }).slice(0, 10);

      setFeasts(upcoming);

      // Restore original Date.now
      Date.now = originalDate;
    } catch (error) {
      console.error('Error loading debug data:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedDate, activeNovenas, has54DayActive]);

  useEffect(() => {
    if (isOpen) {
      loadDebugData();
    }
  }, [isOpen, loadDebugData]);

  const handleAddActiveNovena = (novenaType: string) => {
    if (!activeNovenas.includes(novenaType)) {
      setActiveNovenas([...activeNovenas, novenaType]);
    }
  };

  const handleRemoveActiveNovena = (novenaType: string) => {
    setActiveNovenas(activeNovenas.filter(n => n !== novenaType));
  };

  const handleConfigChange = (key: string, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    liturgicalCalendar.updateConfig(newConfig);
    loadDebugData();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date(selectedDate);
    const target = new Date(dateString);
    return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bug className="w-5 h-5" />
              <h2 className="text-xl font-bold">Liturgical Calendar Debug Panel</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Test Date
                </h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Simulating recommendations for this date
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Active Novenas</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={has54DayActive}
                      onChange={(e) => setHas54DayActive(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">54-Day Novena Active</span>
                  </label>

                  <div className="text-sm">
                    <p className="font-medium mb-1">Individual Novenas:</p>
                    {['st_joseph', 'st_anthony', 'immaculate_conception', 'our_lady_fatima'].map(novena => (
                      <label key={novena} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={activeNovenas.includes(novena)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleAddActiveNovena(novena);
                            } else {
                              handleRemoveActiveNovena(novena);
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-xs">{novena.replace(/_/g, ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Configuration
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <label className="block text-xs font-medium mb-1">Max Recommendations:</label>
                    <input
                      type="number"
                      value={config.maxRecommendations}
                      onChange={(e) => handleConfigChange('maxRecommendations', parseInt(e.target.value))}
                      className="w-full p-1 border rounded text-xs dark:bg-gray-600 dark:border-gray-500"
                      min="1"
                      max="10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Days in Advance:</label>
                    <input
                      type="number"
                      value={config.daysInAdvance}
                      onChange={(e) => handleConfigChange('daysInAdvance', parseInt(e.target.value))}
                      className="w-full p-1 border rounded text-xs dark:bg-gray-600 dark:border-gray-500"
                      min="1"
                      max="60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Min Days Before Feast:</label>
                    <input
                      type="number"
                      value={config.minDaysBeforeFeast}
                      onChange={(e) => handleConfigChange('minDaysBeforeFeast', parseInt(e.target.value))}
                      className="w-full p-1 border rounded text-xs dark:bg-gray-600 dark:border-gray-500"
                      min="0"
                      max="10"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={loadDebugData}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <RotateCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh Data</span>
              </button>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {/* Recommendations */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Generated Recommendations ({recommendations.length})
                </h3>
                {loading ? (
                  <div className="animate-pulse space-y-2">
                    <div className="h-20 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    <div className="h-20 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </div>
                ) : recommendations.length > 0 ? (
                  <div className="space-y-3">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="transform scale-95">
                        <NovenaRecommendationCard
                          recommendation={rec}
                          onStartNovena={onStartNovena}
                          onStart54DayNovena={onStart54DayNovena}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No recommendations for the selected date and configuration.
                  </p>
                )}
              </div>

              {/* Upcoming Feasts */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Upcoming Feasts (Next 60 Days)
                </h3>
                {loading ? (
                  <div className="animate-pulse space-y-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1 text-xs">
                    {feasts.map((feast) => (
                      <div
                        key={feast.id}
                        className="flex justify-between items-center py-1 px-2 rounded hover:bg-white dark:hover:bg-gray-600"
                      >
                        <span className="font-medium">{feast.name}</span>
                        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                          <span>{formatDate(feast.date)}</span>
                          <span className="text-xs bg-gray-200 dark:bg-gray-600 px-1 rounded">
                            {getDaysUntil(feast.date)}d
                          </span>
                          <span className={`text-xs px-1 rounded ${
                            feast.rank === 'SOLEMNITY' ? 'bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                            feast.rank === 'FEAST' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {feast.rank.toLowerCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};