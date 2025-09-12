export type NovenaPhase = 'petition' | 'thanksgiving';

export type MysteryType = 'Joyful' | 'Sorrowful' | 'Glorious' | 'Luminous';

export interface CycleInfo {
  phase: NovenaPhase;
  cycle: number;
  mystery: MysteryType;
}

export interface PhaseInfo {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

export interface NovenaState {
  currentDay: number;
  completedDays: Set<number>;
  startDate: Date | null;
  intention: string;
  showIntentionModal: boolean;
}

export interface StorageState {
  currentDay: number;
  completedDays: number[];
  startDate: string | null;
  intention: string;
}

// New types for dual prayer system
export type PrayerType = '54-day-novena' | 'daily-rosary';

export type AppScreen = 'selection' | 'novena' | 'rosary-modal';

export interface RosarySession {
  id: string;
  date: string;
  prayerType: PrayerType;
  mystery: MysteryType;
  completed: boolean;
  duration?: number;
  intention?: string;
}

export interface RosaryStreakData {
  currentStreak: number;
  longestStreak: number;
  lastPrayerDate: string | null;
  totalPrayers: number;
  sessions: RosarySession[];
}

export interface AppState {
  // Navigation
  currentScreen: AppScreen;
  
  // Existing novena state
  novenaState: NovenaState;
  
  // New rosary streak state
  rosaryStreak: RosaryStreakData;
  
  // Modal states
  showRosarySelection: boolean;
  showPrayerModal: boolean;
  
  // Current prayer context
  currentPrayer?: {
    type: PrayerType;
    mystery: MysteryType;
    intention?: string;
    sessionId?: string;
  };
}