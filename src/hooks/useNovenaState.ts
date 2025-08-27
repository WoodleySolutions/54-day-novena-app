import { useState, useCallback } from 'react';

export interface NovenaState {
  currentDay: number;
  completedDays: Set<number>;
  startDate: Date | null;
  intention: string;
  showIntentionModal: boolean;
}

export const useNovenaState = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState(new Set<number>());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [intention, setIntention] = useState('');
  const [showIntentionModal, setShowIntentionModal] = useState(false);

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

  return {
    // State
    currentDay,
    completedDays,
    startDate,
    intention,
    showIntentionModal,
    
    // Actions
    setCurrentDay,
    setIntention,
    markDayComplete,
    startNovena,
    closeIntentionModal
  };
};