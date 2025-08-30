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