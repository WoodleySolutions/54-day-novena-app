import React, { useState, useEffect } from 'react';
import { X, Bell, BellOff, Trash2, AlertTriangle, Heart } from 'lucide-react';
import { 
  getNotificationPermission, 
  requestNotificationPermission,
  scheduleDailyReminder 
} from '../../utils/notifications';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onClearData
}) => {
  const [permission, setPermission] = useState(getNotificationPermission());
  const [reminderTime, setReminderTime] = useState('09:00');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const checkPermission = () => {
      setPermission(getNotificationPermission());
    };

    if (isOpen) {
      checkPermission();
      document.addEventListener('visibilitychange', checkPermission);
    }

    return () => {
      document.removeEventListener('visibilitychange', checkPermission);
    };
  }, [isOpen]);

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

  const handleClearData = () => {
    onClearData();
    setShowClearConfirm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Notification Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Prayer Reminders</h3>
            
            {permission.denied ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-yellow-800">
                  <BellOff className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Notifications Blocked</p>
                    <p className="text-sm mt-1">
                      Enable notifications in your browser settings to receive prayer reminders.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className={`w-5 h-5 ${permission.granted ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className="font-medium text-gray-700">Daily Notifications</span>
                  </div>
                  
                  {!permission.granted ? (
                    <button
                      onClick={handleEnableNotifications}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Enable
                    </button>
                  ) : (
                    <span className="text-sm text-green-600 font-medium">✓ Enabled</span>
                  )}
                </div>

                {permission.granted && (
                  <div className="pl-8 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-600">Reminder Time:</label>
                      <input
                        type="time"
                        value={reminderTime}
                        onChange={(e) => handleTimeChange(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      You'll receive daily reminders to pray your novena at this time.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Support Development Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Support Development</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-pink-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">Your generosity helps us serve the community</p>
                  <p className="text-sm text-gray-600 mt-1">
                    This app is free and ad-free. If you find it helpful for your prayer life, 
                    consider supporting development and hosting costs.
                  </p>
                </div>
              </div>
              
              <div className="pl-8">
                <div className="flex flex-wrap gap-2">
                  {[3, 5, 10, 15].map((amount) => (
                    <a
                      key={amount}
                      href="https://ko-fi.com/woodleysolutions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-pink-100 hover:bg-pink-200 text-pink-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-pink-200 hover:border-pink-300"
                    >
                      ${amount}
                    </a>
                  ))}
                  <a
                    href="https://ko-fi.com/woodleysolutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Other Amount
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Clear Data Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Data Management</h3>
            
            {!showClearConfirm ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Trash2 className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Reset Novena Progress</p>
                    <p className="text-sm text-gray-600 mt-1">
                      This will clear all your progress, completed days, and intention. 
                      You'll be able to start fresh with a new novena.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Clear All Data
                </button>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800">Are you sure?</p>
                    <p className="text-sm text-red-700 mt-1">
                      This action cannot be undone. All your novena progress will be permanently deleted.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleClearData}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Yes, Clear All Data
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};