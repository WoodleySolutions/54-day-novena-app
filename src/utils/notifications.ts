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

// Alternative test using Service Worker
export const showServiceWorkerTestNotification = async () => {
  console.log('=== SERVICE WORKER NOTIFICATION TEST START ===');
  
  // Check service worker support
  console.log('Service Worker in navigator:', 'serviceWorker' in navigator);
  console.log('showNotification supported:', 'showNotification' in ServiceWorkerRegistration.prototype);
  
  if (!('serviceWorker' in navigator)) {
    console.error('❌ Service Worker not supported');
    alert('Service Worker not supported in this environment');
    return false;
  }

  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
    console.error('❌ Service Worker notifications not supported');
    alert('Service Worker notifications not supported');
    return false;
  }

  try {
    console.log('🔄 Getting service worker registration...');
    const registration = await navigator.serviceWorker.ready;
    console.log('✅ Service worker ready:', registration);
    console.log('SW scope:', registration.scope);
    console.log('SW active:', !!registration.active);
    
    console.log('🔔 Attempting to show service worker notification...');
    await registration.showNotification('54-Day Novena - SW Test', {
      body: "Service Worker test - if you see this, SW notifications work! 🙏",
      icon: '/android-chrome-192x192.png',
      badge: '/favicon-32x32.png',
      tag: 'novena-sw-test',
      requireInteraction: false,
      silent: false,
      vibrate: [200, 100, 200],
      actions: [
        { action: 'open', title: '🙏 Pray' },
        { action: 'close', title: '❌ Close' }
      ],
      data: {
        test: true,
        timestamp: Date.now()
      }
    });
    
    console.log('✅ Service worker notification request sent');
    console.log('=== SERVICE WORKER NOTIFICATION TEST END ===');
    return true;
  } catch (error) {
    console.error('❌ Service worker notification error:', error);
    alert('Service Worker error: ' + (error as Error).message);
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
      // Test with immediate notification
      try {
        const testNotif = new Notification('Permission Success!', {
          body: 'Notifications should now work! 🎉',
          icon: '/android-chrome-192x192.png'
        });
        setTimeout(() => testNotif.close(), 5000);
      } catch (err) {
        console.error('Immediate test notification failed:', err);
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