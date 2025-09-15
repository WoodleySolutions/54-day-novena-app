import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Play, CheckCircle, Circle, MoreVertical, Trash2 } from 'lucide-react';
import { ActiveNovena } from '../../types';
import { NOVENA_INFO } from '../../constants/novenas';

interface MyNovenasProps {
  activeNovenas: ActiveNovena[];
  onContinueNovena: (novenaId: string) => void;
  onStartNewNovena: () => void;
  onRemoveNovena?: (novenaId: string) => void;
}

export const MyNovenas: React.FC<MyNovenasProps> = ({
  activeNovenas,
  onContinueNovena,
  onStartNewNovena,
  onRemoveNovena
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  const formatStartDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateNextDay = (novena: ActiveNovena) => {
    if (novena.isCompleted) return 'Completed';
    return novena.currentDay <= 9 ? novena.currentDay : 'Completed';
  };

  const getProgressPercentage = (novena: ActiveNovena) => {
    return Math.round((novena.completedDays.size / 9) * 100);
  };

  const canContinueToday = (novena: ActiveNovena) => {
    if (novena.isCompleted) return false;

    const startDate = new Date(novena.startDate);
    const daysSinceStart = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    // Can pray today if we haven't completed today's prayer and we're within the novena period
    return daysSinceStart < 9 && !novena.completedDays.has(daysSinceStart + 1);
  };

  const handleRemoveClick = (novenaId: string) => {
    setShowConfirmDelete(novenaId);
    setOpenDropdown(null);
  };

  const handleConfirmDelete = (novenaId: string) => {
    if (onRemoveNovena) {
      onRemoveNovena(novenaId);
    }
    setShowConfirmDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

  return (
    <div className="space-y-4">
      {/* Active Novenas */}
      {activeNovenas.length > 0 && (
        <div className="space-y-3">
          {activeNovenas.map((novena) => {
            const info = NOVENA_INFO[novena.type];
            const nextDay = calculateNextDay(novena);
            const progressPercent = getProgressPercentage(novena);
            const canContinue = canContinueToday(novena);

            return (
              <div
                key={novena.id}
                className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Header with Icon and Title */}
                <div className="flex items-center space-x-4 mb-3">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-xl text-white shadow-md"
                    style={{ backgroundColor: info.color }}
                  >
                    {info.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {info.name}
                    </h3>

                    {/* Status indicators - responsive layout */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Started {formatStartDate(novena.startDate)}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {novena.isCompleted
                            ? 'Completed'
                            : `Day ${nextDay} of 9`
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Button */}
                  {onRemoveNovena && (
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(openDropdown === novena.id ? null : novena.id);
                        }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </button>

                      {/* Dropdown Menu */}
                      {openDropdown === novena.id && (
                        <div className="absolute right-0 top-8 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-10 min-w-[120px]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveClick(novena.id);
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center space-x-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Progress
                    </span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${progressPercent}%`,
                        backgroundColor: info.color
                      }}
                    />
                  </div>
                </div>

                {/* Day Indicators */}
                <div className="mb-3 flex flex-wrap justify-center sm:justify-start gap-1">
                  {Array.from({ length: 9 }, (_, i) => {
                    const dayNum = i + 1;
                    const isCompleted = novena.completedDays.has(dayNum);
                    const isCurrent = dayNum === novena.currentDay && !novena.isCompleted;

                    return (
                      <div
                        key={dayNum}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                          isCompleted
                            ? 'text-white shadow-sm'
                            : isCurrent
                            ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 ring-2 ring-offset-1'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                        }`}
                        style={{
                          backgroundColor: isCompleted ? info.color : undefined,
                          borderColor: isCurrent ? info.color : undefined
                        }}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          dayNum
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Intention */}
                {novena.intention && (
                  <div className="mb-3 text-sm text-gray-600 dark:text-gray-400 italic">
                    "{novena.intention}"
                  </div>
                )}

                {/* Continue Button - Now below progress tracker */}
                <div className="flex justify-center sm:justify-end">
                  {novena.isCompleted ? (
                    <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Complete</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onContinueNovena(novena.id)}
                      disabled={!canContinue}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        canContinue
                          ? 'text-white shadow-md hover:shadow-lg transform hover:scale-105'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                      style={{
                        backgroundColor: canContinue ? info.color : undefined
                      }}
                    >
                      <Play className="w-4 h-4" />
                      <span className="whitespace-nowrap">
                        {canContinue ? 'Continue' : 'Today\'s prayer completed'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Start New Novena Button */}
      <button
        onClick={onStartNewNovena}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
      >
        <Circle className="w-5 h-5" />
        <span>Start a New Novena</span>
      </button>

      {/* Empty State */}
      {activeNovenas.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Active Novenas
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start your first novena - nine days of focused prayer and intention
          </p>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Remove Novena
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to remove this novena? All prayer sessions and progress will be permanently deleted.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete(showConfirmDelete)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};