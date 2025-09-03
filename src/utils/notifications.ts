export interface NotificationPermissionState {
  granted: boolean;
  denied: boolean;
  default: boolean;
}

export const getNotificationPermission = (): NotificationPermissionState => {
  if (!('Notification' in window)) {
    return { granted: false, denied: true, default: false };
  }

  return {
    granted: Notification.permission === 'granted',
    denied: Notification.permission === 'denied',
    default: Notification.permission === 'default'
  };
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const scheduleLocalNotification = (title: string, body: string, delayMinutes: number = 0) => {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  setTimeout(() => {
    const notification = new Notification(title, {
      body,
      icon: '/android-chrome-192x192.png',
      badge: '/favicon-32x32.png',
      tag: 'novena-reminder'
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // Auto close after 10 seconds
    setTimeout(() => notification.close(), 10000);
  }, delayMinutes * 60 * 1000);
};

export const scheduleDailyReminder = (hour: number = 9, minute: number = 0) => {
  // Don't schedule if user has disabled notifications
  if (areNotificationsDisabled()) {
    console.log('Notifications are disabled by user preference');
    return;
  }

  // Store the reminder time preference
  setReminderTimePreference(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);

  // Check if service worker is available for better notification scheduling
  if ('serviceWorker' in navigator && 'showNotification' in ServiceWorkerRegistration.prototype) {
    scheduleServiceWorkerNotification(hour, minute);
  } else {
    // Fallback to regular setTimeout (limited effectiveness when app is closed)
    scheduleFallbackNotification(hour, minute);
  }
};

const scheduleServiceWorkerNotification = async (hour: number, minute: number) => {
  try {
    // For now, use the same approach as fallback since setTimeout has the same limitations
    // In a real production app, you'd want to use a backend service or push notifications for reliable scheduling
    scheduleFallbackNotification(hour, minute);
    console.log('Using fallback notification scheduling (service worker setTimeout has same limitations)');
  } catch (error) {
    console.error('Service worker notification failed, falling back:', error);
    scheduleFallbackNotification(hour, minute);
  }
};

const scheduleFallbackNotification = async (hour: number, minute: number) => {
  const now = new Date();
  const scheduledTime = new Date();
  scheduledTime.setHours(hour, minute, 0, 0);

  // If time has passed today, schedule for tomorrow
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const timeUntilNotification = scheduledTime.getTime() - now.getTime();

  setTimeout(async () => {
    if (getNotificationPermission().granted && !areNotificationsDisabled()) {
      // Try Service Worker first (required for TWA), fall back to regular notifications
      if ('serviceWorker' in navigator && 'showNotification' in ServiceWorkerRegistration.prototype) {
        try {
          const registration = await navigator.serviceWorker.ready;
          await registration.showNotification('54-Day Novena Reminder', {
            body: "It's time for your daily novena prayer! 🙏",
            icon: '/android-chrome-192x192.png',
            badge: '/favicon-32x32.png',
            tag: 'novena-reminder',
            requireInteraction: true
          });
        } catch (error) {
          console.error('Service worker notification failed:', error);
          // Don't fall back to regular Notification in TWA - it will fail
        }
      } else {
        // Only try regular notifications if not in TWA
        if (!isTrustedWebActivity()) {
          try {
            const notification = new Notification('54-Day Novena Reminder', {
              body: "It's time for your daily novena prayer! 🙏",
              icon: '/android-chrome-192x192.png',
              badge: '/favicon-32x32.png',
              tag: 'novena-reminder'
            });

            notification.onclick = () => {
              window.focus();
              notification.close();
            };

            setTimeout(() => notification.close(), 30000);
          } catch (error) {
            console.error('Regular notification failed:', error);
          }
        }
      }
    }
  }, timeUntilNotification);

  console.log(`Reminder scheduled for ${scheduledTime.toLocaleString()}`);
};

export const clearNotifications = () => {
  // Clear any existing timeouts (we can't actually clear them without IDs, but this is for future enhancement)
  // For now, we'll store the preference in localStorage to indicate notifications are disabled
  localStorage.setItem('notifications-disabled', 'true');
  console.log('Notifications disabled by user');
};

export const areNotificationsDisabled = (): boolean => {
  return localStorage.getItem('notifications-disabled') === 'true';
};

export const enableNotifications = () => {
  localStorage.removeItem('notifications-disabled');
  console.log('Notifications enabled by user');
};

// Reminder time preferences
export const getReminderTimePreference = (): string => {
  return localStorage.getItem('reminder-time') || '09:00';
};

export const setReminderTimePreference = (time: string): void => {
  localStorage.setItem('reminder-time', time);
};

// Detect if we're running in a TWA
export const isTrustedWebActivity = (): boolean => {
  return (
    // Check if it's in standalone mode (like TWA)
    window.matchMedia('(display-mode: standalone)').matches ||
    // Check for TWA-specific user agent
    navigator.userAgent.includes('wv') || // WebView
    // Check if it's an Android app context
    (window.navigator && 'share' in window.navigator && /Android/i.test(navigator.userAgent))
  );
};

// Initialize notifications on app start
export const initializeNotifications = () => {
  // Only initialize if user has granted permission and hasn't disabled notifications
  if (getNotificationPermission().granted && !areNotificationsDisabled()) {
    const timePreference = getReminderTimePreference();
    const [hour, minute] = timePreference.split(':').map(Number);
    scheduleDailyReminder(hour, minute);
    console.log('Notifications initialized with preference:', timePreference);
  }
};

// Test notification function for immediate feedback
export const showTestNotification = () => {
  console.log('=== NOTIFICATION TEST START ===');
  console.log('showTestNotification called');
  
  // Environment detection
  console.log('User Agent:', navigator.userAgent);
  console.log('Display mode:', window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser');
  console.log('Is TWA:', isTrustedWebActivity());
  console.log('Platform:', navigator.platform);
  console.log('Vendor:', navigator.vendor);
  
  // Feature detection
  console.log('Notification support:', 'Notification' in window);
  console.log('Service Worker support:', 'serviceWorker' in navigator);
  console.log('Permission state:', Notification.permission);
  
  // Permission details
  const permState = getNotificationPermission();
  console.log('Permission object:', permState);
  
  if (!('Notification' in window)) {
    console.error('❌ Notifications not supported in this browser');
    alert('Notifications not supported in this browser/environment');
    return false;
  }

  if (!permState.granted) {
    console.log('❌ Permission not granted. Current permission:', Notification.permission);
    alert(`Permission not granted. Current state: ${Notification.permission}`);
    return false;
  }

  try {
    console.log('✅ Creating notification...');
    const notification = new Notification('54-Day Novena Test', {
      body: "Test notification - if you see this, basic notifications work! 🙏",
      icon: '/android-chrome-192x192.png',
      badge: '/favicon-32x32.png',
      tag: 'novena-test',
      requireInteraction: false,
      silent: false
    });

    console.log('✅ Notification object created:', notification);

    notification.onclick = () => {
      console.log('📱 Notification clicked');
      window.focus();
      notification.close();
    };

    notification.onerror = (error) => {
      console.error('❌ Notification error:', error);
      alert('Notification error: ' + error);
    };

    notification.onshow = () => {
      console.log('✅ Notification shown successfully');
    };

    notification.onclose = () => {
      console.log('🔔 Notification closed');
    };

    // Close after 15 seconds
    setTimeout(() => {
      console.log('⏰ Auto-closing notification after 15 seconds');
      notification.close();
    }, 15000);
    
    console.log('=== NOTIFICATION TEST END ===');
    return true;
  } catch (error) {
    console.error('❌ Error creating notification:', error);
    alert('Error creating notification: ' + (error as Error).message);
    console.log('=== NOTIFICATION TEST END (ERROR) ===');
    return false;
  }
};

// Simple immediate test to verify function execution
export const showSimpleAlert = () => {
  try {
    console.log('showSimpleAlert called');
    alert('🔔 Simple test - if you see this alert, the function is working!');
    return true;
  } catch (error) {
    console.error('Even simple alert failed:', error);
    return false;
  }
};

// Alternative test using Service Worker
export const showServiceWorkerTestNotification = async () => {
  console.log('=== SERVICE WORKER NOTIFICATION TEST START ===');
  
  // Immediate confirmation
  alert('🚀 Starting comprehensive notification test...');
  
  // Environment detection
  console.log('🌍 Environment Check:');
  console.log('User Agent:', navigator.userAgent);
  console.log('Platform:', navigator.platform);
  console.log('Vendor:', navigator.vendor);
  console.log('Language:', navigator.language);
  console.log('Online:', navigator.onLine);
  console.log('Cookie enabled:', navigator.cookieEnabled);
  
  // PWA/TWA detection
  console.log('📱 PWA/TWA Detection:');
  console.log('Display mode standalone:', window.matchMedia('(display-mode: standalone)').matches);
  console.log('Display mode fullscreen:', window.matchMedia('(display-mode: fullscreen)').matches);
  console.log('Display mode minimal-ui:', window.matchMedia('(display-mode: minimal-ui)').matches);
  console.log('Display mode browser:', window.matchMedia('(display-mode: browser)').matches);
  console.log('Is TWA (our detection):', isTrustedWebActivity());
  
  // Check service worker support
  console.log('🔧 Service Worker Support:');
  console.log('Service Worker in navigator:', 'serviceWorker' in navigator);
  console.log('showNotification supported:', 'showNotification' in ServiceWorkerRegistration.prototype);
  console.log('getNotifications supported:', 'getNotifications' in ServiceWorkerRegistration.prototype);
  
  if (!('serviceWorker' in navigator)) {
    console.error('❌ Service Worker not supported');
    alert('❌ Service Worker not supported in this environment');
    return false;
  }

  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
    console.error('❌ Service Worker notifications not supported');
    alert('❌ Service Worker notifications not supported');
    return false;
  }

  try {
    console.log('🔄 Service Worker Analysis:');
    
    // First check if we have a service worker at all
    const registrations = await navigator.serviceWorker.getRegistrations();
    console.log('📋 SW registrations found:', registrations.length);
    
    registrations.forEach((reg, index) => {
      console.log(`Registration ${index}:`, {
        scope: reg.scope,
        active: !!reg.active,
        installing: !!reg.installing,
        waiting: !!reg.waiting,
        onupdatefound: !!reg.onupdatefound
      });
    });
    
    if (registrations.length === 0) {
      console.error('❌ No service worker registrations found');
      alert('❌ No service worker found. The app might not be properly installed as a PWA.');
      return false;
    }
    
    const registration = await navigator.serviceWorker.ready;
    console.log('✅ Service worker ready:', {
      scope: registration.scope,
      active: !!registration.active,
      installing: !!registration.installing,
      waiting: !!registration.waiting
    });
    
    if (registration.active) {
      console.log('🔗 Active SW details:', {
        scriptURL: registration.active.scriptURL,
        state: registration.active.state
      });
    }
    
    // Permission checks at multiple levels
    console.log('🔐 Permission Analysis:');
    console.log('Notification.permission:', Notification.permission);
    
    if ('permissions' in navigator) {
      try {
        const permission = await navigator.permissions.query({name: 'notifications'});
        console.log('Permissions API state:', permission.state);
        console.log('Permission object:', permission);
        
        // Listen for permission changes
        permission.onchange = () => {
          console.log('Permission changed to:', permission.state);
        };
        
        if (permission.state !== 'granted') {
          alert(`❌ Permission not granted at Permissions API level: ${permission.state}\nNotification.permission: ${Notification.permission}`);
          return false;
        }
      } catch (permError) {
        console.error('Permissions API query failed:', permError);
      }
    }
    
    // Clear any existing test notifications first
    console.log('🧹 Clearing existing test notifications...');
    try {
      const existingBefore = await registration.getNotifications();
      console.log(`Found ${existingBefore.length} existing notifications`);
      
      for (const notif of existingBefore) {
        if (notif.tag && notif.tag.includes('test')) {
          console.log(`Closing test notification: ${notif.title} (${notif.tag})`);
          notif.close();
        }
      }
      
      // Wait a moment for closures to take effect
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (clearError) {
      console.warn('Could not clear existing notifications:', clearError);
    }
    
    console.log('🔔 Attempting notification sequence...');
    
    // Test 1: Ultra-minimal notification
    console.log('Test 1: Ultra-minimal notification...');
    try {
      await registration.showNotification('Test 1', {
        tag: 'test-1-minimal'
      });
      console.log('✅ Minimal notification call completed');
    } catch (minimalError) {
      console.error('❌ Minimal notification failed:', minimalError);
      alert(`❌ Even minimal notification failed: ${(minimalError as Error).message}`);
      return false;
    }
    
    // Short delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test 2: Simple notification with body
    console.log('Test 2: Simple notification with body...');
    try {
      await registration.showNotification('Test 2 - Simple', {
        body: 'Simple test body',
        tag: 'test-2-simple'
      });
      console.log('✅ Simple notification call completed');
    } catch (simpleError) {
      console.error('❌ Simple notification failed:', simpleError);
    }
    
    // Short delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test 3: Rich notification with all options
    console.log('Test 3: Rich notification...');
    try {
      await registration.showNotification('Test 3 - Rich Notification', {
        body: "Rich test with all options! 🙏 If you see this, everything works!",
        icon: '/android-chrome-192x192.png',
        badge: '/favicon-32x32.png',
        tag: 'test-3-rich',
        requireInteraction: false,
        silent: false,
        renotify: true,
        timestamp: Date.now(),
        data: {
          test: true,
          timestamp: Date.now(),
          source: 'service-worker-test'
        }
      });
      console.log('✅ Rich notification call completed');
    } catch (richError) {
      console.error('❌ Rich notification failed:', richError);
    }
    
    // Wait for notifications to potentially appear
    console.log('⏱️ Waiting 2 seconds for notifications to appear...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check notification status
    console.log('📊 Notification Status Check:');
    try {
      const activeNotifications = await registration.getNotifications();
      console.log(`📬 Active notifications found: ${activeNotifications.length}`);
      
      let testNotificationCount = 0;
      activeNotifications.forEach((notif, index) => {
        console.log(`Notification ${index}:`, {
          title: notif.title,
          body: notif.body,
          tag: notif.tag,
          data: notif.data
        });
        
        if (notif.tag && notif.tag.startsWith('test-')) {
          testNotificationCount++;
        }
      });
      
      // Detailed result reporting
      let resultMessage = `📊 Notification Test Results:\n\n`;
      resultMessage += `• Total active notifications: ${activeNotifications.length}\n`;
      resultMessage += `• Test notifications found: ${testNotificationCount}\n`;
      resultMessage += `• Permissions API: ${await navigator.permissions.query({name: 'notifications'}).then(p => p.state).catch(() => 'unavailable')}\n`;
      resultMessage += `• Notification.permission: ${Notification.permission}\n`;
      resultMessage += `• Is TWA: ${isTrustedWebActivity()}\n`;
      resultMessage += `• User Agent: ${navigator.userAgent.includes('wv') ? 'WebView' : 'Regular'}\n\n`;
      
      if (testNotificationCount === 0) {
        resultMessage += `❌ NO TEST NOTIFICATIONS VISIBLE\n\n`;
        resultMessage += `Possible causes:\n`;
        resultMessage += `• Android Do Not Disturb mode enabled\n`;
        resultMessage += `• Chrome notifications disabled in Android Settings\n`;
        resultMessage += `• App notification channel disabled\n`;
        resultMessage += `• Battery optimization blocking notifications\n`;
        resultMessage += `• Notification grouped/hidden by system\n`;
        resultMessage += `• TWA notification channel issues\n\n`;
        resultMessage += `Try checking:\n`;
        resultMessage += `• Android Settings > Apps > Chrome > Notifications\n`;
        resultMessage += `• Android Settings > Notifications > Do Not Disturb\n`;
        resultMessage += `• Pull down notification panel manually`;
      } else {
        resultMessage += `✅ SUCCESS! ${testNotificationCount} notifications are active`;
      }
      
      alert(resultMessage);
      
    } catch (statusError) {
      console.error('❌ Could not check notification status:', statusError);
      alert(`❌ Could not check notification status: ${(statusError as Error).message}`);
    }
    
    console.log('=== SERVICE WORKER NOTIFICATION TEST END ===');
    return true;
  } catch (error) {
    console.error('❌ Service worker notification test failed:', error);
    alert('❌ Service Worker test failed: ' + (error as Error).message);
    console.log('=== SERVICE WORKER NOTIFICATION TEST END (ERROR) ===');
    return false;
  }
};

// Add a Chrome-specific permission helper
export const checkChromeNotificationDetails = () => {
  console.log('=== CHROME NOTIFICATION DETAILS ===');
  
  // Check if we're in Chrome
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  console.log('Is Chrome browser:', isChrome);
  
  // Check permission
  console.log('Notification.permission:', Notification.permission);
  console.log('Permission timestamp:', localStorage.getItem('notification-permission-timestamp'));
  
  // Check if we have any stored notification data
  console.log('Stored reminder time:', getReminderTimePreference());
  console.log('Notifications disabled:', areNotificationsDisabled());
  
  // Try to get detailed permission info if available
  if ('permissions' in navigator) {
    navigator.permissions.query({name: 'notifications'}).then(result => {
      console.log('Permissions API result:', result.state);
      console.log('Permission object:', result);
      alert(`Permissions API: ${result.state}\nNotification.permission: ${Notification.permission}\nIs TWA: ${isTrustedWebActivity()}`);
    }).catch(err => {
      console.log('Permissions API error:', err);
      alert(`Permission check failed: ${err.message}`);
    });
  } else {
    alert(`No Permissions API\nNotification.permission: ${Notification.permission}\nIs TWA: ${isTrustedWebActivity()}`);
  }
  
  console.log('=== END CHROME NOTIFICATION DETAILS ===');
};

// Force permission re-request specifically for TWA
export const forceRequestNotificationPermission = async (): Promise<boolean> => {
  console.log('=== FORCE PERMISSION REQUEST ===');
  
  if (!('Notification' in window)) {
    alert('Notifications not supported in this environment');
    return false;
  }

  console.log('Current permission before request:', Notification.permission);
  
  try {
    // Clear any cached permission state
    localStorage.removeItem('notification-permission-timestamp');
    
    // Force a new permission request
    const permission = await Notification.requestPermission();
    console.log('New permission result:', permission);
    
    // Store timestamp of when we requested
    localStorage.setItem('notification-permission-timestamp', Date.now().toString());
    
    if (permission === 'granted') {
      alert('✅ Permission granted successfully!');
      // Test with Service Worker instead of regular notification for TWA compatibility
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;
          await registration.showNotification('Permission Success!', {
            body: 'Notifications should now work! 🎉',
            icon: '/android-chrome-192x192.png',
            tag: 'permission-success'
          });
        } catch (err) {
          console.error('SW test notification failed:', err);
        }
      }
      return true;
    } else {
      alert(`❌ Permission ${permission}. Check your browser/device settings.`);
      return false;
    }
  } catch (error) {
    console.error('Permission request error:', error);
    alert(`Permission request failed: ${(error as Error).message}`);
    return false;
  }
};

// Check TWA vs PWA installation differences
export const checkTWAInstallationDetails = async () => {
  console.log('=== TWA INSTALLATION ANALYSIS ===');
  
  let analysis = [];
  let details = '🔍 TWA Installation Analysis:\n\n';
  
  // Check installation method
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const userAgent = navigator.userAgent;
  const hasWebView = userAgent.includes('wv');
  const isAndroid = /Android/i.test(userAgent);
  
  details += `📱 Installation Type:\n`;
  details += `• Display mode standalone: ${isStandalone}\n`;
  details += `• User agent contains 'wv': ${hasWebView}\n`;
  details += `• Is Android: ${isAndroid}\n`;
  details += `• Our TWA detection: ${isTrustedWebActivity()}\n\n`;
  
  // Check Service Worker registration
  details += `🔧 Service Worker Status:\n`;
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    details += `• Total registrations: ${registrations.length}\n`;
    
    if (registrations.length === 0) {
      analysis.push('No Service Worker registered');
      details += `❌ NO SERVICE WORKER FOUND\n`;
      details += `This explains why notifications don't work!\n\n`;
      
      details += `🤔 Possible causes:\n`;
      details += `• TWA build didn't include Service Worker properly\n`;
      details += `• Different Service Worker scope in Play Store version\n`;
      details += `• Bubblewrap configuration issue\n`;
      details += `• Service Worker not registering in TWA context\n\n`;
      
      details += `🔧 Solutions to try:\n`;
      details += `• Check if SW works in browser version (54dayrosary.com)\n`;
      details += `• Compare TWA manifest with web manifest\n`;
      details += `• Check Bubblewrap build configuration\n`;
      details += `• Verify SW registration in public/ folder\n`;
    } else {
      registrations.forEach((reg, index) => {
        details += `Registration ${index + 1}:\n`;
        details += `  • Scope: ${reg.scope}\n`;
        details += `  • Active: ${!!reg.active}\n`;
        details += `  • Installing: ${!!reg.installing}\n`;
        details += `  • Waiting: ${!!reg.waiting}\n`;
        if (reg.active) {
          details += `  • Script URL: ${reg.active.scriptURL}\n`;
          details += `  • State: ${reg.active.state}\n`;
        }
        details += `\n`;
      });
    }
  } catch (error) {
    analysis.push(`Service Worker check failed: ${(error as Error).message}`);
    details += `❌ SW check error: ${(error as Error).message}\n\n`;
  }
  
  // Check if we can register a Service Worker manually
  details += `🔄 Manual SW Registration Test:\n`;
  try {
    if ('serviceWorker' in navigator) {
      details += `• ServiceWorker API available: ✅\n`;
      // Try to register a service worker (this will show if registration is blocked)
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      details += `• Manual registration test: ✅ SUCCESS\n`;
      details += `• New registration scope: ${registration.scope}\n`;
    } else {
      details += `• ServiceWorker API available: ❌ NOT AVAILABLE\n`;
      analysis.push('Service Worker API not available in TWA');
    }
  } catch (swError) {
    details += `• Manual registration test: ❌ FAILED\n`;
    details += `• Error: ${(swError as Error).message}\n`;
    analysis.push(`SW manual registration failed: ${(swError as Error).message}`);
  }
  
  // Show results
  if (analysis.length === 0) {
    alert(`✅ TWA Installation looks normal\n\n${details}`);
  } else {
    alert(`❌ Found ${analysis.length} TWA issues:\n\n${analysis.join('\n')}\n\n${details}`);
  }
  
  console.log('TWA Analysis:', analysis);
  console.log('TWA Details:', details);
  console.log('=== END TWA INSTALLATION ANALYSIS ===');
};

// Check for Android system-level notification restrictions
export const checkAndroidNotificationRestrictions = async () => {
  console.log('=== ANDROID NOTIFICATION RESTRICTIONS CHECK ===');
  
  let restrictions = [];
  
  // Check if we're on Android
  const isAndroid = /Android/i.test(navigator.userAgent);
  console.log('Is Android:', isAndroid);
  
  if (!isAndroid) {
    alert('Not on Android - this check is for Android devices only');
    return;
  }
  
  // Check basic notification permission
  const basicPerm = Notification.permission;
  console.log('Basic notification permission:', basicPerm);
  
  if (basicPerm !== 'granted') {
    restrictions.push('Basic notification permission not granted');
  }
  
  // Check Permissions API if available
  if ('permissions' in navigator) {
    try {
      const permResult = await navigator.permissions.query({name: 'notifications'});
      console.log('Permissions API result:', permResult.state);
      if (permResult.state !== 'granted') {
        restrictions.push(`Permissions API shows: ${permResult.state}`);
      }
    } catch (err) {
      restrictions.push('Permissions API query failed');
      console.error('Permissions API error:', err);
    }
  } else {
    restrictions.push('Permissions API not available');
  }
  
  // Check Service Worker availability
  if (!('serviceWorker' in navigator)) {
    restrictions.push('Service Worker not available');
  } else {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      if (registrations.length === 0) {
        restrictions.push('No Service Worker registered');
      } else {
        console.log('Service Worker registrations found:', registrations.length);
      }
    } catch (err) {
      restrictions.push('Service Worker check failed');
    }
  }
  
  // Show results
  if (restrictions.length === 0) {
    alert('✅ No obvious notification restrictions detected.\n\nPossible Android system issues:\n• Do Not Disturb mode enabled\n• App notification channel disabled in Settings\n• Battery optimization blocking notifications\n• Chrome notifications disabled in device Settings');
  } else {
    alert(`❌ Found ${restrictions.length} potential issues:\n\n${restrictions.join('\n')}\n\nCheck your device settings!`);
  }
  
  console.log('Restriction analysis:', restrictions);
  console.log('=== END ANDROID RESTRICTIONS CHECK ===');
};