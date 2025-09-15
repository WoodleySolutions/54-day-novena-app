import {
  createRosarySession,
  createChapletSession,
  completeRosarySession,
  updateSessionJournal,
  migrateSessionsToCloudFormat,
  getRecentSessions,
  searchSessions,
  loadRosaryStreakData,
  saveRosaryStreakData,
  clearRosaryStreakData
} from '../rosaryStreak';
import { RosaryStreakData, RosarySession } from '../../types';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('RosaryStreak Utility Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Session Creation', () => {
    test('createRosarySession creates valid session with cloud-ready fields', () => {
      const session = createRosarySession('Joyful', 'daily-rosary', 'Test intention', 5);

      expect(session).toMatchObject({
        prayerType: 'daily-rosary',
        mystery: 'Joyful',
        currentDay: 5,
        completed: false,
        intention: 'Test intention'
      });

      // Cloud-ready fields
      expect(session.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
      expect(session.deviceId).toBeTruthy();
      expect(session.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
      expect(session.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
      expect(session.syncStatus).toBe('pending');
      expect(session.version).toBe(1);
      expect(session.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    test('createChapletSession creates valid chaplet session', () => {
      const session = createChapletSession('divine-mercy', 'Healing prayer');

      expect(session).toMatchObject({
        prayerType: 'chaplet',
        chaplet: 'divine-mercy',
        completed: false,
        intention: 'Healing prayer'
      });

      expect(session.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
      expect(session.syncStatus).toBe('pending');
    });

    test('sessions get consistent device ID', () => {
      const session1 = createRosarySession('Sorrowful', 'daily-rosary');
      const session2 = createChapletSession('st-michael');

      expect(session1.deviceId).toBe(session2.deviceId);
      expect(session1.deviceId).toBeTruthy();
    });
  });

  describe('Session Completion', () => {
    test('completeRosarySession updates session with journal data', () => {
      const initialData: RosaryStreakData = {
        currentStreak: 0,
        longestStreak: 0,
        lastPrayerDate: null,
        totalPrayers: 0,
        sessions: [
          createRosarySession('Glorious', 'daily-rosary', 'Initial intention')
        ]
      };

      const journalData = {
        reflection: 'Beautiful prayer experience',
        mood: 'peaceful' as const,
        gratitudes: ['Health', 'Family'],
        insights: 'God is always listening',
        tags: ['healing', 'gratitude']
      };

      const result = completeRosarySession(
        initialData.sessions[0].id,
        initialData,
        15, // duration in minutes
        journalData
      );

      const completedSession = result.sessions[0];
      expect(completedSession.completed).toBe(true);
      expect(completedSession.duration).toBe(15);
      expect(completedSession.reflection).toBe('Beautiful prayer experience');
      expect(completedSession.mood).toBe('peaceful');
      expect(completedSession.gratitudes).toEqual(['Health', 'Family']);
      expect(completedSession.insights).toBe('God is always listening');
      expect(completedSession.tags).toEqual(['healing', 'gratitude']);
      expect(completedSession.version).toBe(2); // Version incremented
      expect(completedSession.syncStatus).toBe('pending');
    });

    test('completeRosarySession updates streak data correctly', () => {
      const today = new Date().toISOString().split('T')[0];
      const initialData: RosaryStreakData = {
        currentStreak: 2,
        longestStreak: 5,
        lastPrayerDate: null,
        totalPrayers: 10,
        sessions: [
          {
            ...createRosarySession('Luminous', 'daily-rosary'),
            date: today
          }
        ]
      };

      const result = completeRosarySession(
        initialData.sessions[0].id,
        initialData
      );

      expect(result.totalPrayers).toBe(11);
      expect(result.lastPrayerDate).toBe(today);
      expect(result.currentStreak).toBeGreaterThanOrEqual(1);
      expect(result.longestStreak).toBeGreaterThanOrEqual(result.currentStreak);
    });
  });

  describe('Journal Updates', () => {
    test('updateSessionJournal updates existing session', () => {
      const session = createRosarySession('Joyful', 'daily-rosary');
      const initialData: RosaryStreakData = {
        currentStreak: 1,
        longestStreak: 1,
        lastPrayerDate: null,
        totalPrayers: 0,
        sessions: [session]
      };

      const journalUpdate = {
        reflection: 'Updated reflection',
        mood: 'joyful' as const,
        tags: ['peace', 'joy']
      };

      const result = updateSessionJournal(session.id, initialData, journalUpdate);
      const updatedSession = result.sessions[0];

      expect(updatedSession.reflection).toBe('Updated reflection');
      expect(updatedSession.mood).toBe('joyful');
      expect(updatedSession.tags).toEqual(['peace', 'joy']);
      expect(updatedSession.version).toBe(2);
      expect(updatedSession.syncStatus).toBe('pending');
    });
  });

  describe('Data Migration', () => {
    test('migrateSessionsToCloudFormat converts legacy sessions', () => {
      const legacySession = {
        id: 'rosary-1234567890-abc123',
        date: '2024-01-15',
        prayerType: 'daily-rosary' as const,
        mystery: 'Sorrowful' as const,
        completed: true,
        intention: 'Legacy intention'
      };

      const initialData: RosaryStreakData = {
        currentStreak: 1,
        longestStreak: 1,
        lastPrayerDate: '2024-01-15',
        totalPrayers: 1,
        sessions: [legacySession as RosarySession]
      };

      const result = migrateSessionsToCloudFormat(initialData);
      const migratedSession = result.sessions[0];

      expect(migratedSession.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
      expect(migratedSession.deviceId).toBeTruthy();
      expect(migratedSession.createdAt).toBeTruthy();
      expect(migratedSession.updatedAt).toBeTruthy();
      expect(migratedSession.syncStatus).toBe('pending');
      expect(migratedSession.version).toBe(1);

      // Original data preserved
      expect(migratedSession.intention).toBe('Legacy intention');
      expect(migratedSession.mystery).toBe('Sorrowful');
      expect(migratedSession.completed).toBe(true);
    });

    test('migrateSessionsToCloudFormat preserves already migrated sessions', () => {
      const alreadyMigratedSession = createRosarySession('Glorious', 'daily-rosary');
      const initialData: RosaryStreakData = {
        currentStreak: 1,
        longestStreak: 1,
        lastPrayerDate: null,
        totalPrayers: 0,
        sessions: [alreadyMigratedSession]
      };

      const result = migrateSessionsToCloudFormat(initialData);
      const preservedSession = result.sessions[0];

      expect(preservedSession.id).toBe(alreadyMigratedSession.id);
      expect(preservedSession.createdAt).toBe(alreadyMigratedSession.createdAt);
      expect(preservedSession.version).toBe(alreadyMigratedSession.version);
    });
  });

  describe('Session Filtering and Search', () => {
    let testData: RosaryStreakData;

    beforeEach(() => {
      const now = new Date();
      const sessions = [
        // Recent sessions
        {
          ...createRosarySession('Joyful', 'daily-rosary', 'Healing for family'),
          date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          completed: true,
          reflection: 'Peaceful prayer time',
          tags: ['family', 'healing']
        },
        {
          ...createChapletSession('divine-mercy', 'World peace'),
          date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          completed: true,
          insights: 'God\'s mercy is infinite'
        },
        // Older session
        {
          ...createRosarySession('Sorrowful', '54-day-novena', 'Thanksgiving'),
          date: new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          completed: true,
          currentDay: 35,
          gratitudes: ['Health', 'Family', 'Peace']
        }
      ];

      testData = {
        currentStreak: 2,
        longestStreak: 10,
        lastPrayerDate: sessions[0].date,
        totalPrayers: 3,
        sessions
      };
    });

    test('getRecentSessions filters by date range', () => {
      const recent = getRecentSessions(testData, 30);
      expect(recent).toHaveLength(2);
      expect(recent[0].date).toBe(testData.sessions[0].date); // Most recent first
    });

    test('searchSessions finds by intention content', () => {
      const results = searchSessions(testData, 'healing');
      expect(results).toHaveLength(1);
      expect(results[0].intention).toContain('healing');
    });

    test('searchSessions finds by reflection content', () => {
      const results = searchSessions(testData, 'peaceful');
      expect(results).toHaveLength(1);
      expect(results[0].reflection).toContain('Peaceful');
    });

    test('searchSessions finds by insights', () => {
      const results = searchSessions(testData, 'mercy');
      expect(results).toHaveLength(1);
      expect(results[0].insights).toContain('mercy');
    });

    test('searchSessions finds by gratitudes', () => {
      const results = searchSessions(testData, 'health');
      expect(results).toHaveLength(1);
      expect(results[0].gratitudes).toContain('Health');
    });

    test('searchSessions finds by tags', () => {
      const results = searchSessions(testData, 'family');
      expect(results).toHaveLength(1);
      expect(results[0].tags).toContain('family');
    });

    test('searchSessions is case insensitive', () => {
      const results = searchSessions(testData, 'HEALING');
      expect(results).toHaveLength(1);
    });

    test('searchSessions returns empty for no matches', () => {
      const results = searchSessions(testData, 'nonexistent');
      expect(results).toHaveLength(0);
    });
  });

  describe('Local Storage Integration', () => {
    test('saveRosaryStreakData persists to localStorage', () => {
      const testData: RosaryStreakData = {
        currentStreak: 5,
        longestStreak: 10,
        lastPrayerDate: '2024-01-15',
        totalPrayers: 20,
        sessions: [createRosarySession('Luminous', 'daily-rosary')]
      };

      saveRosaryStreakData(testData);

      const stored = localStorage.getItem('rosary-streak-data');
      expect(stored).toBeTruthy();

      const parsed = JSON.parse(stored!);
      expect(parsed.currentStreak).toBe(5);
      expect(parsed.sessions).toHaveLength(1);
    });

    test('loadRosaryStreakData returns default for empty storage', () => {
      const data = loadRosaryStreakData();

      expect(data).toEqual({
        currentStreak: 0,
        longestStreak: 0,
        lastPrayerDate: null,
        totalPrayers: 0,
        sessions: []
      });
    });

    test('loadRosaryStreakData parses valid stored data', () => {
      const testData: RosaryStreakData = {
        currentStreak: 3,
        longestStreak: 8,
        lastPrayerDate: '2024-01-15',
        totalPrayers: 15,
        sessions: []
      };

      localStorage.setItem('rosary-streak-data', JSON.stringify(testData));

      const loaded = loadRosaryStreakData();
      expect(loaded).toEqual(testData);
    });

    test('loadRosaryStreakData handles corrupted data gracefully', () => {
      localStorage.setItem('rosary-streak-data', 'invalid json');

      const data = loadRosaryStreakData();
      expect(data).toEqual({
        currentStreak: 0,
        longestStreak: 0,
        lastPrayerDate: null,
        totalPrayers: 0,
        sessions: []
      });
    });

    test('clearRosaryStreakData removes data from storage', () => {
      localStorage.setItem('rosary-streak-data', 'test data');

      clearRosaryStreakData();

      expect(localStorage.getItem('rosary-streak-data')).toBeNull();
    });
  });

  describe('Device ID Management', () => {
    test('device ID is generated and persisted', () => {
      expect(localStorage.getItem('deviceId')).toBeNull();

      const session1 = createRosarySession('Joyful', 'daily-rosary');
      const deviceId1 = session1.deviceId;

      expect(deviceId1).toBeTruthy();
      expect(localStorage.getItem('deviceId')).toBe(deviceId1);

      const session2 = createRosarySession('Sorrowful', 'daily-rosary');
      expect(session2.deviceId).toBe(deviceId1);
    });
  });

  describe('UUID Generation', () => {
    test('generates valid UUIDs', () => {
      const session1 = createRosarySession('Joyful', 'daily-rosary');
      const session2 = createRosarySession('Sorrowful', 'daily-rosary');

      // Valid UUID v4 format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(session1.id).toMatch(uuidRegex);
      expect(session2.id).toMatch(uuidRegex);

      // Should be unique
      expect(session1.id).not.toBe(session2.id);
    });
  });
});