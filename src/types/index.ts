export type NovenaPhase = 'petition' | 'thanksgiving';

export type MysteryType = 'Joyful' | 'Sorrowful' | 'Glorious' | 'Luminous';

export type ChapletType = 'divine-mercy' | 'st-michael' | 'sacred-heart' | 'seven-sorrows' | 'precious-blood' | 'holy-face' | 'immaculate-heart' | 'st-joseph' | 'five-wounds' | 'st-bridget';

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

// New types for expanded prayer system
export type PrayerType = '54-day-novena' | 'daily-rosary' | 'chaplet';

export type AppScreen = 'selection' | 'novena' | 'rosary-modal' | 'history';

export type MoodType = 'peaceful' | 'joyful' | 'sorrowful' | 'hopeful' | 'troubled';

export type SyncStatus = 'synced' | 'pending' | 'conflict';

export interface ChapletInfo {
  name: string;
  description: string;
  color: string;
  icon: string;
  beadCount: number;
  estimatedDuration: number; // in minutes
}

export interface ChapletStep {
  id: string;
  title: string;
  content: string | string[];
  type: 'prayer' | 'instruction' | 'beads';
  beadCount?: number;
  prayer?: string;
}

export interface RosarySession {
  id: string;
  userId?: string; // Future: link to user account
  deviceId?: string; // Track originating device
  createdAt: string; // ISO timestamp for proper sync ordering
  updatedAt: string; // Track modifications for conflict resolution
  syncStatus?: SyncStatus; // Sync state
  version?: number; // For optimistic concurrency control

  date: string;
  prayerType: PrayerType;
  mystery?: MysteryType; // Optional for chaplets
  chaplet?: ChapletType; // New for chaplet prayers
  currentDay?: number; // For novena tracking
  completed: boolean;
  duration?: number;

  // Journaling fields
  intention?: string; // Pre-prayer intention
  reflection?: string; // Post-prayer reflection
  mood?: MoodType; // User's mood before/after prayer
  gratitudes?: string[]; // Things grateful for
  insights?: string; // Spiritual insights gained
  tags?: string[]; // Custom user tags
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