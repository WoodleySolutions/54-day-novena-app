export type NovenaPhase = 'petition' | 'thanksgiving';

export type MysteryType = 'Joyful' | 'Sorrowful' | 'Glorious';

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