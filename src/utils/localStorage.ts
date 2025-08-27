/**
 * localStorage utilities for 54-day novena tracker
 * Handles data persistence with error handling and validation
 */

const STORAGE_KEY = 'novena-tracker-data';
const STORAGE_VERSION = 1;

export interface StoredNovenaData {
  version: number;
  completedDays: number[];
  startDate: string | null;
  intention: string;
  lastUpdated: string;
}

/**
 * Safely parse JSON with error handling
 */
const safeJsonParse = <T>(jsonString: string | null, fallback: T): T => {
  if (!jsonString) return fallback;
  
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Failed to parse stored data:', error);
    return fallback;
  }
};

/**
 * Validate stored data structure and types
 */
const validateStoredData = (data: any): data is StoredNovenaData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.version === 'number' &&
    Array.isArray(data.completedDays) &&
    (typeof data.startDate === 'string' || data.startDate === null) &&
    typeof data.intention === 'string' &&
    typeof data.lastUpdated === 'string'
  );
};

/**
 * Load novena data from localStorage
 */
export const loadNovenaData = (): StoredNovenaData | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = safeJsonParse(stored, null);
    
    if (!parsed || !validateStoredData(parsed)) {
      console.info('No valid stored data found, starting fresh');
      return null;
    }
    
    // At this point, parsed is validated as StoredNovenaData
    const validData = parsed as StoredNovenaData;
    
    // Handle version migration if needed
    if (validData.version !== STORAGE_VERSION) {
      console.info(`Migrating data from version ${validData.version} to ${STORAGE_VERSION}`);
      // Future: Add migration logic here
    }
    
    return validData;
  } catch (error) {
    console.error('Error loading novena data:', error);
    return null;
  }
};

/**
 * Save novena data to localStorage
 */
export const saveNovenaData = (data: Omit<StoredNovenaData, 'version' | 'lastUpdated'>): boolean => {
  try {
    const dataToStore: StoredNovenaData = {
      ...data,
      version: STORAGE_VERSION,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    return true;
  } catch (error) {
    console.error('Error saving novena data:', error);
    // Handle quota exceeded or other storage errors
    return false;
  }
};

/**
 * Clear all stored novena data
 */
export const clearNovenaData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing novena data:', error);
  }
};

/**
 * Get storage usage info (for debugging)
 */
export const getStorageInfo = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return {
      hasData: !!data,
      dataSize: data ? data.length : 0,
      storageKey: STORAGE_KEY
    };
  } catch (error) {
    return { hasData: false, dataSize: 0, storageKey: STORAGE_KEY };
  }
};