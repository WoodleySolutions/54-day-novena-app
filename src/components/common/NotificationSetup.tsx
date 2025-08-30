import React, { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { 
  getNotificationPermission, 
  requestNotificationPermission,
  scheduleDailyReminder 
} from '../../utils/notifications';

export const NotificationSetup: React.FC = () => {
  const [permission, setPermission] = useState(getNotificationPermission());
  const [reminderTime, setReminderTime] = useState('09:00');

  useEffect(() => {
    const checkPermission = () => {
      setPermission(getNotificationPermission());
    };

    // Check permission on component mount and when page becomes visible
    checkPermission();
    document.addEventListener('visibilitychange', checkPermission);

    return () => {
      document.removeEventListener('visibilitychange', checkPermission);
    };
  }, []);

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setPermission(getNotificationPermission());
    
    if (granted) {
      const [hour, minute] = reminderTime.split(':').map(Number);
      scheduleDailyReminder(hour, minute);
    }
  };

  const handleTimeChange = (newTime: string) => {
    setReminderTime(newTime);
    if (permission.granted) {
      const [hour, minute] = newTime.split(':').map(Number);
      scheduleDailyReminder(hour, minute);
    }
  };

  if (permission.denied) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 text-yellow-800">
          <BellOff className="w-5 h-5" />
          <span className="text-sm">
            Notifications are blocked. Enable them in your browser settings for prayer reminders.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className={`w-5 h-5 ${permission.granted ? 'text-blue-600' : 'text-gray-500'}`} />
          <span className="font-medium text-gray-800">Daily Prayer Reminders</span>
        </div>
        
        {!permission.granted ? (
          <button
            onClick={handleEnableNotifications}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Enable
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">Remind me at:</label>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>
        )}
      </div>
      
      {permission.granted && (
        <p className="text-sm text-gray-600 mt-2">
          ✅ You'll receive daily reminders to pray your novena
        </p>
      )}
    </div>
  );
};