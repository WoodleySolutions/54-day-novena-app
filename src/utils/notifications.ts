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

  const now = new Date();
  const scheduledTime = new Date();
  scheduledTime.setHours(hour, minute, 0, 0);

  // If time has passed today, schedule for tomorrow
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const timeUntilNotification = scheduledTime.getTime() - now.getTime();
  const minutesUntilNotification = Math.floor(timeUntilNotification / (1000 * 60));

  scheduleLocalNotification(
    '54-Day Novena Reminder',
    "It's time for your daily novena prayer! 🙏",
    minutesUntilNotification
  );

  console.log(`Next reminder scheduled for ${scheduledTime.toLocaleString()}`);
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