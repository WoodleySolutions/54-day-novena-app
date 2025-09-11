import React, { useState, useEffect } from 'react';
import { X, Bell, BellOff, Trash2, AlertTriangle, Heart, Monitor, MonitorOff, Sun, Moon, Laptop, Crown } from 'lucide-react';
import { PremiumGuard } from '../common/PremiumGuard';
import { 
  getNotificationPermission, 
  requestNotificationPermission,
  scheduleDailyReminder,
  clearNotifications,
  areNotificationsDisabled,
  enableNotifications,
  getReminderTimePreference,
  setReminderTimePreference,
  shouldShowNotifications
} from '../../utils/notifications';
import {
  isWakeLockSupported,
  getKeepScreenAwakePreference,
  setKeepScreenAwakePreference
} from '../../utils/screenWakeLock';
import { useTheme, ThemeMode } from '../../contexts/ThemeContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearData: () => void;
  onUpgradeClick?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onClearData,
  onUpgradeClick
}) => {
  const [permission, setPermission] = useState(getNotificationPermission());
  const [reminderTime, setReminderTime] = useState(getReminderTimePreference());
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [notificationsDisabled, setNotificationsDisabled] = useState(areNotificationsDisabled());
  const [keepScreenAwake, setKeepScreenAwake] = useState(getKeepScreenAwakePreference());
  
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const checkPermission = () => {
      setPermission(getNotificationPermission());
    };

    if (isOpen) {
      checkPermission();
      setNotificationsDisabled(areNotificationsDisabled());
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
      enableNotifications();
      setNotificationsDisabled(false);
      const [hour, minute] = reminderTime.split(':').map(Number);
      scheduleDailyReminder(hour, minute);
    }
  };

  const handleDisableNotifications = () => {
    clearNotifications();
    setNotificationsDisabled(true);
  };

  const handleTimeChange = (newTime: string) => {
    setReminderTime(newTime);
    setReminderTimePreference(newTime);
    if (permission.granted && !notificationsDisabled) {
      const [hour, minute] = newTime.split(':').map(Number);
      scheduleDailyReminder(hour, minute);
    }
  };

  const handleKeepScreenAwakeToggle = (enabled: boolean) => {
    setKeepScreenAwake(enabled);
    setKeepScreenAwakePreference(enabled);
  };

  const handleClearData = () => {
    onClearData();
    setShowClearConfirm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-600 transition-colors duration-300">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Notification Settings - Desktop Only */}
          {shouldShowNotifications() && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Prayer Reminders</h3>
            
            {permission.denied ? (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
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
                    <Bell className={`w-5 h-5 ${permission.granted && !notificationsDisabled ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className="font-medium text-gray-700 dark:text-gray-200">Daily Notifications</span>
                  </div>
                  
                  {!permission.granted ? (
                    <button
                      onClick={handleEnableNotifications}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Enable
                    </button>
                  ) : notificationsDisabled ? (
                    <button
                      onClick={handleEnableNotifications}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Enable
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">✓ Enabled</span>
                      <button
                        onClick={handleDisableNotifications}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Disable
                      </button>
                    </div>
                  )}
                </div>

                {permission.granted && !notificationsDisabled && (
                  <div className="pl-8 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Reminder Time:</label>
                      <input
                        type="time"
                        value={reminderTime}
                        onChange={(e) => handleTimeChange(e.target.value)}
                        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 dark:[color-scheme:dark]"
                      />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      You'll receive daily reminders to pray your novena at this time.
                    </p>
                  </div>
                )}
                
                {permission.granted && notificationsDisabled && (
                  <div className="pl-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Notifications are currently disabled. Click "Enable" above to turn them back on.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          )}

          {/* Mobile Notification Info */}
          {!shouldShowNotifications() && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Prayer Reminders</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100">Coming Soon</p>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                    Mobile notifications will be available in a future update. 
                    We recommend setting a phone reminder or bookmarking the app for your daily prayer time.
                  </p>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Screen Wake Lock Setting - Only show if supported */}
          {isWakeLockSupported() && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-6 transition-colors duration-300">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Prayer Experience</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {keepScreenAwake ? (
                      <Monitor className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <MonitorOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-200">Keep Screen Awake</span>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Prevents screen from dimming while prayer modal is open
                      </p>
                    </div>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={keepScreenAwake}
                      onChange={(e) => handleKeepScreenAwakeToggle(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Theme Settings */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6 transition-colors duration-300">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Appearance</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                {theme === 'light' ? (
                  <Sun className="w-5 h-5 text-yellow-500 dark:text-yellow-400 mt-0.5" />
                ) : theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-blue-400 dark:text-blue-300 mt-0.5" />
                ) : (
                  <Laptop className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                )}
                <div className="flex-1">
                  <span className="font-medium text-gray-700 dark:text-gray-200">Theme</span>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-3">
                    Choose your preferred color scheme
                  </p>
                  
                  <div className="space-y-2">
                    {([
                      { mode: 'light' as ThemeMode, icon: Sun, label: 'Light', description: 'Always use light theme' },
                      { mode: 'dark' as ThemeMode, icon: Moon, label: 'Dark', description: 'Always use dark theme' },
                      { mode: 'system' as ThemeMode, icon: Laptop, label: 'System', description: 'Follow your device setting' }
                    ]).map(({ mode, icon: Icon, label, description }) => (
                      <button
                        key={mode}
                        onClick={() => setTheme(mode)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                          theme === mode
                            ? 'bg-indigo-50 dark:bg-indigo-900 border-2 border-indigo-200 dark:border-indigo-600'
                            : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${
                          theme === mode 
                            ? 'text-indigo-600 dark:text-indigo-400' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`} />
                        <div>
                          <div className={`font-medium ${
                            theme === mode 
                              ? 'text-indigo-900 dark:text-indigo-100' 
                              : 'text-gray-900 dark:text-gray-100'
                          }`}>
                            {label}
                          </div>
                          <div className={`text-sm ${
                            theme === mode 
                              ? 'text-indigo-700 dark:text-indigo-300' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Features Section */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6 transition-colors duration-300">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Premium Features</h3>
            
            <PremiumGuard
              feature="advanced prayer settings"
              onUpgradeClick={onUpgradeClick}
              fallback={
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Crown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium text-gray-900 dark:text-white">Unlock Premium Settings</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <div>• Custom prayer reminder schedules</div>
                    <div>• Multiple novena types (Divine Mercy, Sacred Heart)</div>
                    <div>• Advanced progress analytics and insights</div>
                    <div>• Export prayer journal and progress</div>
                  </div>
                  {onUpgradeClick && (
                    <button
                      onClick={onUpgradeClick}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      Upgrade to Premium
                    </button>
                  )}
                </div>
              }
            >
              <div className="space-y-4">
                {/* Premium custom reminder settings */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Crown className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium text-purple-800 dark:text-purple-200">Premium Active</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Custom Reminder Times
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="time"
                          className="px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                          defaultValue="09:00"
                        />
                        <input
                          type="time"
                          className="px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                          defaultValue="21:00"
                        />
                      </div>
                      <p className="text-xs text-purple-700 dark:text-purple-300 mt-2">
                        Set multiple daily reminders for your prayer times
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </PremiumGuard>
          </div>

          {/* Support Development Section */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6 transition-colors duration-300">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Support Development</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-pink-500 dark:text-pink-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-200">Your generosity helps us serve the community</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    This app is free and ad-free. If you find it helpful for your prayer life, 
                    consider supporting development and hosting costs.
                  </p>
                </div>
              </div>
              
              <div className="pl-8">
                <a
                  href="https://ko-fi.com/woodleysolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Support on Ko-fi
                </a>
              </div>
            </div>
          </div>

          {/* Development Tools */}
          {process.env.NODE_ENV === 'development' && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-6 transition-colors duration-300">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Development Tools</h3>
              
              <div className="space-y-3">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-yellow-600 dark:text-yellow-400">⚠️</div>
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">Development Mode</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        If you're experiencing cache issues, use the "Clear ALL + Reload" button below.
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      if (window.confirm('This will clear all app data and reload the page. Continue?')) {
                        const { clearAllAppData } = require('../../utils/devHelpers');
                        clearAllAppData();
                      }
                    }}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-3"
                  >
                    Clear ALL + Reload
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Clear Data Section */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6 transition-colors duration-300">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Data Management</h3>
            
            {!showClearConfirm ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Trash2 className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-200">Reset Novena Progress</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
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
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-200">Are you sure?</p>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
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
                    className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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