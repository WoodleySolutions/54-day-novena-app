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

const scheduleFallbackNotification = (hour: number, minute: number) => {
  const now = new Date();
  const scheduledTime = new Date();
  scheduledTime.setHours(hour, minute, 0, 0);

  // If time has passed today, schedule for tomorrow
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const timeUntilNotification = scheduledTime.getTime() - now.getTime();

  setTimeout(() => {
    if (getNotificationPermission().granted && !areNotificationsDisabled()) {
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
    }
  }, timeUntilNotification);

  console.log(`Fallback reminder scheduled for ${scheduledTime.toLocaleString()}`);
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
  if (getNotificationPermission().granted) {
    const notification = new Notification('54-Day Novena Reminder - Test', {
      body: "This is a test notification. Your daily reminders are working! 🙏",
      icon: '/android-chrome-192x192.png',
      badge: '/favicon-32x32.png',
      tag: 'novena-test'
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    setTimeout(() => notification.close(), 10000);
    return true;
  }
  return false;
};