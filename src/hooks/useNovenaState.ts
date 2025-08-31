import { useState, useCallback, useEffect, useMemo } from 'react';
import { loadNovenaData, saveNovenaData } from '../utils/localStorage';
import { TOTAL_DAYS } from '../constants/novena';
import { getCurrentDayToPray } from '../utils/novenaCalculations';

export interface NovenaState {
  currentDay: number;
  completedDays: Set<number>;
  startDate: Date | null;
  intention: string;
  showIntentionModal: boolean;
}

export const useNovenaState = () => {
  // Initialize state with localStorage data or defaults
  const initializeState = () => {
    const savedData = loadNovenaData();
    
    return {
      completedDays: savedData?.completedDays ? new Set(savedData.completedDays) : new Set<number>(),
      startDate: savedData?.startDate ? new Date(savedData.startDate) : null,
      intention: savedData?.intention ?? '',
      showIntentionModal: false // Never restore modal state
    };
  };

  const initialState = initializeState();
  
  const [completedDays, setCompletedDays] = useState(initialState.completedDays);
  const [startDate, setStartDate] = useState(initialState.startDate);
  const [intention, setIntention] = useState(initialState.intention);
  const [showIntentionModal, setShowIntentionModal] = useState(initialState.showIntentionModal);
  const [showPrayerModal, setShowPrayerModal] = useState(false);

  // Calculate current day to pray based on completed days
  const currentDay = useMemo(() => {
    return getCurrentDayToPray(completedDays, TOTAL_DAYS);
  }, [completedDays]);

  const markDayComplete = useCallback((day: number) => {
    setCompletedDays(prev => {
      const newCompleted = new Set(prev);
      if (newCompleted.has(day)) {
        newCompleted.delete(day);
      } else {
        newCompleted.add(day);
      }
      return newCompleted;
    });
  }, []);

  const startNovena = useCallback(() => {
    setStartDate(new Date());
    setShowIntentionModal(true);
  }, []);

  const closeIntentionModal = useCallback(() => {
    setShowIntentionModal(false);
  }, []);

  const openPrayerModal = useCallback(() => {
    setShowPrayerModal(true);
  }, []);

  const closePrayerModal = useCallback(() => {
    setShowPrayerModal(false);
  }, []);

  const completeTodaysPrayer = useCallback(() => {
    markDayComplete(currentDay);
    setShowPrayerModal(false);
  }, [currentDay, markDayComplete]);

  const clearAllData = useCallback(() => {
    setCompletedDays(new Set<number>());
    setStartDate(null);
    setIntention('');
    setShowIntentionModal(false);
    setShowPrayerModal(false);
    // Clear localStorage
    localStorage.removeItem('novena-data');
  }, []);

  // Persist state changes to localStorage
  useEffect(() => {
    // Only save if we have a started novena (prevents saving initial empty state)
    if (startDate) {
      const success = saveNovenaData({
        completedDays: Array.from(completedDays),
        startDate: startDate.toISOString(),
        intention
      });
      
      if (!success) {
        console.warn('Failed to save novena progress');
        // Could show user notification here
      }
    }
  }, [completedDays, startDate, intention]);

  // Enhanced setIntention that persists immediately
  const setIntentionWithPersistence = useCallback((newIntention: string) => {
    setIntention(newIntention);
    // Intention can be set before startDate, so save it separately if needed
  }, []);

  return {
    // State
    currentDay,
    completedDays,
    startDate,
    intention,
    showIntentionModal,
    showPrayerModal,
    
    // Actions
    setIntention: setIntentionWithPersistence,
    markDayComplete,
    startNovena,
    closeIntentionModal,
    openPrayerModal,
    closePrayerModal,
    completeTodaysPrayer,
    clearAllData
  };
};