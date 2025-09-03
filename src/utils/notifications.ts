export interface NotificationPermissionState {
  granted: boolean;
  denied: boolean;
  default: boolean;
}

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

// Check if we should show notification features (desktop only)
export const shouldShowNotifications = (): boolean => {
  // Hide on mobile devices and TWA
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTWA = isTrustedWebActivity();
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  
  // Only show on desktop browsers (not mobile, not TWA, not PWA)
  return !isMobile && !isTWA && !isStandalone;
};

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
  if (!shouldShowNotifications() || !('Notification' in window)) {
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
  if (!shouldShowNotifications() || !('Notification' in window) || Notification.permission !== 'granted') {
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

    // Auto close after 30 seconds
    setTimeout(() => notification.close(), 30000);
  }, delayMinutes * 60 * 1000);
};

export const scheduleDailyReminder = (hour: number = 9, minute: number = 0) => {
  if (!shouldShowNotifications()) {
    return;
  }

  // Don't schedule if user has disabled notifications
  if (areNotificationsDisabled()) {
    return;
  }

  // Store the reminder time preference
  setReminderTimePreference(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);

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
      scheduleLocalNotification('54-Day Novena Reminder', "It's time for your daily novena prayer! 🙏");
    }
  }, timeUntilNotification);

  console.log(`Reminder scheduled for ${scheduledTime.toLocaleString()}`);
};

export const clearNotifications = () => {
  localStorage.setItem('notifications-disabled', 'true');
};

export const areNotificationsDisabled = (): boolean => {
  return localStorage.getItem('notifications-disabled') === 'true';
};

export const enableNotifications = () => {
  localStorage.removeItem('notifications-disabled');
};

// Reminder time preferences
export const getReminderTimePreference = (): string => {
  return localStorage.getItem('reminder-time') || '09:00';
};

export const setReminderTimePreference = (time: string): void => {
  localStorage.setItem('reminder-time', time);
};

// Initialize notifications on app start (desktop only)
export const initializeNotifications = () => {
  if (!shouldShowNotifications()) {
    return;
  }

  // Only initialize if user has granted permission and hasn't disabled notifications
  if (getNotificationPermission().granted && !areNotificationsDisabled()) {
    const timePreference = getReminderTimePreference();
    const [hour, minute] = timePreference.split(':').map(Number);
    scheduleDailyReminder(hour, minute);
    console.log('Notifications initialized with preference:', timePreference);
  }
};