import { NovenaPhase, MysteryType, CycleInfo } from '../types';
import { DAYS_PER_PHASE, MYSTERY_ROTATION, DAYS_PER_CYCLE } from '../constants/novena';

export const getCurrentPhase = (day: number): NovenaPhase => {
  return day <= DAYS_PER_PHASE ? 'petition' : 'thanksgiving';
};

export const getMysteryForDay = (day: number): MysteryType => {
  const dayInCycle = ((day - 1) % DAYS_PER_CYCLE) + 1;
  return MYSTERY_ROTATION[dayInCycle - 1];
};

export const getCycleInfo = (day: number): CycleInfo => {
  const phase = getCurrentPhase(day);
  const adjustedDay = phase === 'petition' ? day : day - DAYS_PER_PHASE;
  const cycle = Math.ceil(adjustedDay / DAYS_PER_CYCLE);
  
  return { 
    phase, 
    cycle, 
    mystery: getMysteryForDay(day) 
  };
};

export const getMysteryColor = (mystery: MysteryType): string => {
  switch(mystery) {
    case 'Joyful': return 'bg-amber-100 dark:bg-amber-900 border-amber-300 dark:border-amber-600 text-amber-800 dark:text-amber-200 transition-colors duration-300';
    case 'Sorrowful': return 'bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-600 text-purple-800 dark:text-purple-200 transition-colors duration-300';
    case 'Glorious': return 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600 text-blue-800 dark:text-blue-200 transition-colors duration-300';
    default: return 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-300';
  }
};

export const calculateCompletionPercentage = (completedDays: Set<number>, totalDays: number): number => {
  return Math.round((completedDays.size / totalDays) * 100);
};

export const getCurrentDayToPray = (completedDays: Set<number>, totalDays: number): number => {
  // Find the first day that hasn't been completed yet
  for (let day = 1; day <= totalDays; day++) {
    if (!completedDays.has(day)) {
      return day;
    }
  }
  // If all days are completed, return the last day
  return totalDays;
};