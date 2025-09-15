import { ActiveNovena, NovenaType, NovenaSession, MoodType, RosarySession } from '../types';
import { loadRosaryStreakData, saveRosaryStreakData } from './rosaryStreak';

const ACTIVE_NOVENAS_KEY = 'active-novenas';
const NOVENA_SESSIONS_KEY = 'novena-sessions';

// Generate UUID for novena IDs
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
};

// Default empty state
const getDefaultActiveNovenas = (): ActiveNovena[] => [];

// Load active novenas from localStorage
export const loadActiveNovenas = (): ActiveNovena[] => {
  try {
    const stored = localStorage.getItem(ACTIVE_NOVENAS_KEY);
    if (!stored) return getDefaultActiveNovenas();

    const parsed = JSON.parse(stored) as any[];

    // Convert to proper format and validate
    const novenas: ActiveNovena[] = parsed.map(novena => ({
      ...novena,
      completedDays: new Set(novena.completedDays || [])
    })).filter(novena =>
      novena.id &&
      novena.type &&
      novena.startDate &&
      typeof novena.currentDay === 'number'
    );

    return novenas;
  } catch (error) {
    console.warn('Failed to load active novenas:', error);
    return getDefaultActiveNovenas();
  }
};

// Save active novenas to localStorage
export const saveActiveNovenas = (novenas: ActiveNovena[]): void => {
  try {
    // Convert Sets to arrays for JSON serialization
    const serializable = novenas.map(novena => ({
      ...novena,
      completedDays: Array.from(novena.completedDays)
    }));

    localStorage.setItem(ACTIVE_NOVENAS_KEY, JSON.stringify(serializable));
  } catch (error) {
    console.error('Failed to save active novenas:', error);
  }
};

// Load novena sessions from localStorage
export const loadNovenaSessions = (): NovenaSession[] => {
  try {
    const stored = localStorage.getItem(NOVENA_SESSIONS_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored) as NovenaSession[];
    return parsed.filter(session =>
      session.id &&
      session.novenaId &&
      session.novenaType &&
      session.date
    );
  } catch (error) {
    console.warn('Failed to load novena sessions:', error);
    return [];
  }
};

// Save novena sessions to localStorage
export const saveNovenaSessions = (sessions: NovenaSession[]): void => {
  try {
    localStorage.setItem(NOVENA_SESSIONS_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('Failed to save novena sessions:', error);
  }
};

// Start a new novena
export const startNovena = (
  novenaType: NovenaType,
  intention?: string
): ActiveNovena => {
  const newNovena: ActiveNovena = {
    id: generateUUID(),
    type: novenaType,
    startDate: new Date().toISOString(),
    currentDay: 1,
    completedDays: new Set<number>(),
    isCompleted: false,
    intention
  };

  const activeNovenas = loadActiveNovenas();
  activeNovenas.push(newNovena);
  saveActiveNovenas(activeNovenas);

  return newNovena;
};

// Complete a novena day
export const completeNovenaDay = (
  novenaId: string,
  day: number,
  journalData?: {
    intention?: string;
    reflection?: string;
    mood?: MoodType;
    gratitudes?: string[];
    insights?: string;
    tags?: string[];
  }
): { novena: ActiveNovena; session: NovenaSession } | null => {
  const activeNovenas = loadActiveNovenas();
  const novenaIndex = activeNovenas.findIndex(n => n.id === novenaId);

  if (novenaIndex === -1) return null;

  const novena = activeNovenas[novenaIndex];
  const today = new Date().toISOString().split('T')[0];

  // Create session record as RosarySession for history integration
  const now = new Date();
  const rosarySession: RosarySession = {
    id: generateUUID(),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    date: today,
    prayerType: 'novena',
    novena: novena.type,
    novenaId,
    currentDay: day,
    completed: true,
    duration: 15, // Default duration, could be dynamic
    intention: journalData?.intention,
    reflection: journalData?.reflection,
    mood: journalData?.mood,
    gratitudes: journalData?.gratitudes,
    insights: journalData?.insights,
    tags: journalData?.tags
  };

  // Also create legacy NovenaSession for backward compatibility
  const novenaSession: NovenaSession = {
    id: generateUUID(),
    novenaId,
    novenaType: novena.type,
    day,
    date: today,
    completed: true,
    intention: journalData?.intention,
    reflection: journalData?.reflection,
    duration: 15
  };

  // Update novena progress
  novena.completedDays.add(day);
  novena.currentDay = Math.min(day + 1, 9);
  novena.isCompleted = novena.completedDays.size >= 9;

  // Update intention only on day 1
  if (day === 1 && journalData?.intention) {
    novena.intention = journalData.intention;
  }

  // Save updated data
  activeNovenas[novenaIndex] = novena;
  saveActiveNovenas(activeNovenas);

  // Save to both systems for compatibility
  const sessions = loadNovenaSessions();
  sessions.push(novenaSession);
  saveNovenaSessions(sessions);

  // Save to rosary streak data for history integration
  const rosaryData = loadRosaryStreakData();
  rosaryData.sessions.push(rosarySession);
  saveRosaryStreakData(rosaryData);

  return { novena, session: novenaSession };
};

// Get novena by ID
export const getNovenaById = (novenaId: string): ActiveNovena | null => {
  const activeNovenas = loadActiveNovenas();
  return activeNovenas.find(n => n.id === novenaId) || null;
};

// Check if a novena day can be prayed today
export const canPrayNovenaDay = (novena: ActiveNovena, day: number): boolean => {
  if (novena.isCompleted || day > 9 || day < 1) return false;

  const startDate = new Date(novena.startDate);
  const today = new Date();
  const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  // Can pray if it's the correct day and hasn't been completed yet
  return daysSinceStart >= (day - 1) && !novena.completedDays.has(day);
};

// Remove/cancel a novena
export const removeNovena = (novenaId: string): boolean => {
  try {
    const activeNovenas = loadActiveNovenas();
    const novenaIndex = activeNovenas.findIndex(n => n.id === novenaId);

    if (novenaIndex === -1) return false;

    // Remove from active novenas
    activeNovenas.splice(novenaIndex, 1);
    saveActiveNovenas(activeNovenas);

    // Also remove associated sessions
    const sessions = loadNovenaSessions();
    const filteredSessions = sessions.filter(s => s.novenaId !== novenaId);
    saveNovenaSessions(filteredSessions);

    // Remove from rosary streak data as well
    const rosaryData = loadRosaryStreakData();
    rosaryData.sessions = rosaryData.sessions.filter(s => s.novenaId !== novenaId);
    saveRosaryStreakData(rosaryData);

    return true;
  } catch (error) {
    console.error('Failed to remove novena:', error);
    return false;
  }
};

// Get next available day for a novena
export const getNextNovenaDay = (novena: ActiveNovena): number | null => {
  if (novena.isCompleted) return null;

  for (let day = 1; day <= 9; day++) {
    if (!novena.completedDays.has(day) && canPrayNovenaDay(novena, day)) {
      return day;
    }
  }

  return null;
};

// Calculate novena statistics
export const getNovenaStats = () => {
  const activeNovenas = loadActiveNovenas();
  const sessions = loadNovenaSessions();

  const totalStarted = activeNovenas.length;
  const totalCompleted = activeNovenas.filter(n => n.isCompleted).length;
  const totalDaysPrayed = sessions.length;
  const currentActive = activeNovenas.filter(n => !n.isCompleted).length;

  return {
    totalStarted,
    totalCompleted,
    totalDaysPrayed,
    currentActive
  };
};

// Search novena sessions (for history integration)
export const searchNovenaSessions = (
  sessions: NovenaSession[],
  query: string
): NovenaSession[] => {
  const searchTerm = query.toLowerCase();

  return sessions.filter(session =>
    session.novenaType.toLowerCase().includes(searchTerm) ||
    session.intention?.toLowerCase().includes(searchTerm) ||
    session.reflection?.toLowerCase().includes(searchTerm)
  );
};

// Clean up completed novenas (optional utility)
export const cleanupCompletedNovenas = (olderThanDays: number = 30): void => {
  const activeNovenas = loadActiveNovenas();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

  const filtered = activeNovenas.filter(novena => {
    if (!novena.isCompleted) return true; // Keep active novenas

    const startDate = new Date(novena.startDate);
    return startDate >= cutoffDate; // Keep recently completed novenas
  });

  if (filtered.length !== activeNovenas.length) {
    saveActiveNovenas(filtered);
  }
};

// Convert novena sessions to rosary session format (for history integration)
export const convertNovenaSessionsToHistory = (novenaSessions: NovenaSession[]) => {
  return novenaSessions.map(session => ({
    id: session.id,
    date: session.date,
    prayerType: 'novena' as const,
    novena: session.novenaType,
    novenaId: session.novenaId,
    currentDay: session.day,
    completed: session.completed,
    duration: session.duration,
    intention: session.intention,
    reflection: session.reflection,
    createdAt: new Date(session.date).toISOString(),
    updatedAt: new Date(session.date).toISOString(),
  }));
};