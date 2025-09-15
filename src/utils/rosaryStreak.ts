import { RosarySession, RosaryStreakData, MysteryType, ChapletType, PrayerType } from '../types';

const ROSARY_STREAK_KEY = 'rosary-streak-data';

// Default empty state
const getDefaultStreakData = (): RosaryStreakData => ({
  currentStreak: 0,
  longestStreak: 0,
  lastPrayerDate: null,
  totalPrayers: 0,
  sessions: []
});

// Load streak data from localStorage
export const loadRosaryStreakData = (): RosaryStreakData => {
  try {
    const stored = localStorage.getItem(ROSARY_STREAK_KEY);
    if (!stored) return getDefaultStreakData();

    const parsed = JSON.parse(stored) as RosaryStreakData;
    
    // Validate the data structure
    if (typeof parsed.currentStreak !== 'number' ||
        typeof parsed.longestStreak !== 'number' ||
        typeof parsed.totalPrayers !== 'number' ||
        !Array.isArray(parsed.sessions)) {
      return getDefaultStreakData();
    }

    return parsed;
  } catch (error) {
    console.warn('Failed to load rosary streak data:', error);
    return getDefaultStreakData();
  }
};

// Save streak data to localStorage
export const saveRosaryStreakData = (data: RosaryStreakData): void => {
  try {
    localStorage.setItem(ROSARY_STREAK_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save rosary streak data:', error);
  }
};

// Generate UUID for cloud-ready sessions
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
};

// Get device ID (or generate one)
const getDeviceId = (): string => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = generateUUID();
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

// Create a new rosary session
export const createRosarySession = (
  mystery: MysteryType,
  prayerType: PrayerType,
  intention?: string,
  currentDay?: number
): RosarySession => {
  const now = new Date().toISOString();
  return {
    id: generateUUID(),
    deviceId: getDeviceId(),
    createdAt: now,
    updatedAt: now,
    syncStatus: 'pending',
    version: 1,
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    prayerType,
    mystery,
    currentDay,
    completed: false,
    intention
  };
};

// Create a new chaplet session
export const createChapletSession = (
  chaplet: ChapletType,
  intention?: string
): RosarySession => {
  const now = new Date().toISOString();
  return {
    id: generateUUID(),
    deviceId: getDeviceId(),
    createdAt: now,
    updatedAt: now,
    syncStatus: 'pending',
    version: 1,
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    prayerType: 'chaplet',
    chaplet,
    completed: false,
    intention
  };
};

// Complete a rosary session and update streak
export const completeRosarySession = (
  sessionId: string,
  currentData: RosaryStreakData,
  duration?: number,
  journalData?: {
    reflection?: string;
    mood?: import('../types').MoodType;
    gratitudes?: string[];
    insights?: string;
    tags?: string[];
  }
): RosaryStreakData => {
  const today = new Date().toISOString().split('T')[0];

  // Find and complete the session
  const updatedSessions = currentData.sessions.map(session =>
    session.id === sessionId
      ? {
          ...session,
          completed: true,
          duration,
          updatedAt: new Date().toISOString(),
          version: (session.version || 1) + 1,
          syncStatus: 'pending' as import('../types').SyncStatus,
          ...journalData
        }
      : session
  );

  // Calculate new streak data
  const newStreakData = { ...currentData, sessions: updatedSessions };

  // Only update streak if this is the first prayer today
  const todaysSessions = updatedSessions.filter(s => s.date === today && s.completed);
  if (todaysSessions.length === 1) { // First completed prayer today
    newStreakData.totalPrayers += 1;
    newStreakData.lastPrayerDate = today;

    // Calculate streak
    const streak = calculateCurrentStreak(updatedSessions);
    newStreakData.currentStreak = streak;
    newStreakData.longestStreak = Math.max(newStreakData.longestStreak, streak);
  }

  return newStreakData;
};

// Calculate the current streak based on sessions
const calculateCurrentStreak = (sessions: RosarySession[]): number => {
  // Get completed sessions sorted by date (most recent first)
  const completedSessions = sessions
    .filter(s => s.completed)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (completedSessions.length === 0) return 0;

  // Get unique dates (in case multiple prayers per day)
  const uniqueDates = Array.from(new Set(completedSessions.map(s => s.date)));
  
  let streak = 0;
  const today = new Date();
  
  for (let i = 0; i < uniqueDates.length; i++) {
    const sessionDate = new Date(uniqueDates[i]);
    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);
    
    // Check if session date matches expected consecutive date
    if (sessionDate.toDateString() === expectedDate.toDateString()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

// Check if user has prayed today
export const hasPrayedToday = (streakData: RosaryStreakData): boolean => {
  const today = new Date().toISOString().split('T')[0];
  return streakData.sessions.some(session => 
    session.date === today && session.completed
  );
};

// Get prayer statistics
export const getPrayerStatistics = (streakData: RosaryStreakData) => {
  const completedSessions = streakData.sessions.filter(s => s.completed);
  
  // Count by mystery type
  const mysteryStats = {
    Joyful: completedSessions.filter(s => s.mystery === 'Joyful').length,
    Sorrowful: completedSessions.filter(s => s.mystery === 'Sorrowful').length,
    Glorious: completedSessions.filter(s => s.mystery === 'Glorious').length,
    Luminous: completedSessions.filter(s => s.mystery === 'Luminous').length,
  };

  // Count by prayer type
  const prayerTypeStats = {
    'daily-rosary': completedSessions.filter(s => s.prayerType === 'daily-rosary').length,
    '54-day-novena': completedSessions.filter(s => s.prayerType === '54-day-novena').length,
    'chaplet': completedSessions.filter(s => s.prayerType === 'chaplet').length,
  };

  // Calculate average session duration (if recorded)
  const sessionsWithDuration = completedSessions.filter(s => s.duration);
  const averageDuration = sessionsWithDuration.length > 0
    ? Math.round(sessionsWithDuration.reduce((sum, s) => sum + (s.duration || 0), 0) / sessionsWithDuration.length)
    : null;

  return {
    totalPrayers: completedSessions.length,
    currentStreak: streakData.currentStreak,
    longestStreak: streakData.longestStreak,
    mysteryStats,
    prayerTypeStats,
    averageDuration,
    lastPrayerDate: streakData.lastPrayerDate
  };
};

// Update a session with journal data
export const updateSessionJournal = (
  sessionId: string,
  currentData: RosaryStreakData,
  journalUpdate: {
    intention?: string;
    reflection?: string;
    mood?: import('../types').MoodType;
    gratitudes?: string[];
    insights?: string;
    tags?: string[];
  }
): RosaryStreakData => {
  const updatedSessions = currentData.sessions.map(session =>
    session.id === sessionId
      ? {
          ...session,
          ...journalUpdate,
          updatedAt: new Date().toISOString(),
          version: (session.version || 1) + 1,
          syncStatus: 'pending' as import('../types').SyncStatus
        }
      : session
  );

  return { ...currentData, sessions: updatedSessions };
};

// Migrate old sessions to new format
export const migrateSessionsToCloudFormat = (data: RosaryStreakData): RosaryStreakData => {
  const now = new Date().toISOString();
  const deviceId = getDeviceId();

  const migratedSessions = data.sessions.map(session => {
    // Skip if already migrated
    if (session.createdAt && session.updatedAt) return session;

    return {
      ...session,
      id: session.id.includes('-') ? session.id : generateUUID(), // Ensure UUID format
      deviceId,
      createdAt: session.date ? `${session.date}T12:00:00.000Z` : now,
      updatedAt: now,
      syncStatus: 'pending' as import('../types').SyncStatus,
      version: 1
    };
  });

  return { ...data, sessions: migratedSessions };
};

// Get recent prayer sessions (last 30 days)
export const getRecentSessions = (
  streakData: RosaryStreakData,
  days: number = 30
): RosarySession[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  const cutoffString = cutoffDate.toISOString().split('T')[0];

  return streakData.sessions
    .filter(session => session.date >= cutoffString)
    .sort((a, b) => b.date.localeCompare(a.date));
};

// Search sessions by content
export const searchSessions = (
  streakData: RosaryStreakData,
  query: string
): RosarySession[] => {
  const lowercaseQuery = query.toLowerCase();

  return streakData.sessions.filter(session => {
    const searchableText = [
      session.intention,
      session.reflection,
      session.insights,
      ...(session.gratitudes || []),
      ...(session.tags || [])
    ].join(' ').toLowerCase();

    return searchableText.includes(lowercaseQuery);
  }).sort((a, b) => b.date.localeCompare(a.date));
};

// Clear all rosary streak data
export const clearRosaryStreakData = (): void => {
  try {
    localStorage.removeItem(ROSARY_STREAK_KEY);
  } catch (error) {
    console.error('Failed to clear rosary streak data:', error);
  }
};