/**
 * Development utilities for cache busting and debugging
 * Only active in development mode
 */

/**
 * Clear all app data including localStorage and reload page
 * This helps avoid cache issues during development
 */
export const clearAllAppData = () => {
  // Allow in both dev and production for testing
  console.log('🧹 Clearing all app data...');

  const keysToRemove = [
    // Main app data
    'novena-tracker-data',
    'novena-trial-data', 
    'novena-premium-status',
    'novena-welcome-seen',
    'novena-subscription-data',
    
    // Settings and preferences
    'theme-preference',
    'notifications-disabled',
    'reminder-time',
    'keep-screen-awake',
    
    // Any other potential keys
    'novena-data' // legacy key
  ];

  console.log('🧹 Clearing all app data...');
  
  // Remove specific keys
  keysToRemove.forEach(key => {
    try {
      localStorage.removeItem(key);
      console.log(`  ✓ Removed: ${key}`);
    } catch (error) {
      console.warn(`  ❌ Failed to remove: ${key}`, error);
    }
  });

  // Also clear any remaining novena-related keys
  const allKeys = Object.keys(localStorage);
  const novenaKeys = allKeys.filter(key => key.toLowerCase().includes('novena'));
  novenaKeys.forEach(key => {
    if (!keysToRemove.includes(key)) {
      try {
        localStorage.removeItem(key);
        console.log(`  ✓ Removed additional: ${key}`);
      } catch (error) {
        console.warn(`  ❌ Failed to remove: ${key}`, error);
      }
    }
  });

  console.log('🔄 Forcing hard reload to clear cache...');
  
  // Force a hard reload to clear any cached components
  // Use multiple methods to ensure cache is busted
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });
  }
  
  // Force reload from server, not cache
  window.location.reload();
};

/**
 * Log all localStorage data for debugging
 */
export const debugLocalStorage = () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('debugLocalStorage is only available in development mode');
    return;
  }

  console.log('📊 Current localStorage data:');
  
  const allKeys = Object.keys(localStorage);
  const novenaKeys = allKeys.filter(key => key.toLowerCase().includes('novena') || key.includes('theme') || key.includes('reminder') || key.includes('notifications'));
  
  if (novenaKeys.length === 0) {
    console.log('  📭 No relevant data found');
    return;
  }

  novenaKeys.forEach(key => {
    try {
      const value = localStorage.getItem(key);
      const parsed = value ? JSON.parse(value) : value;
      console.log(`  🔑 ${key}:`, parsed);
    } catch (error) {
      console.log(`  🔑 ${key}:`, localStorage.getItem(key));
    }
  });
};

/**
 * Add cache-busting parameter to force reload
 */
export const forceCacheReload = () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('forceCacheReload is only available in development mode');
    return;
  }

  const url = new URL(window.location.href);
  url.searchParams.set('_cacheBust', Date.now().toString());
  window.location.href = url.toString();
};

// Make functions available globally in development
if (process.env.NODE_ENV === 'development') {
  (window as any).clearAllAppData = clearAllAppData;
  (window as any).debugLocalStorage = debugLocalStorage;
  (window as any).forceCacheReload = forceCacheReload;
  
  console.log('🛠️ Development helpers loaded:');
  console.log('  • clearAllAppData() - Clear all app data and reload');
  console.log('  • debugLocalStorage() - Show current localStorage data');
  console.log('  • forceCacheReload() - Force cache reload');
}