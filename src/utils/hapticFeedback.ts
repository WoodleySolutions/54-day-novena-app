// Haptic feedback utility for mobile devices
export interface HapticFeedbackOptions {
  type?: 'light' | 'medium' | 'heavy' | 'selection' | 'impact' | 'notification';
  duration?: number;
}

// Check if device supports haptic feedback
export const isHapticSupported = (): boolean => {
  return (
    typeof navigator !== 'undefined' && 
    'vibrate' in navigator
  );
};

// Check if iOS haptic feedback is available
export const isIOSHapticSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    'DeviceMotionEvent' in window &&
    typeof (DeviceMotionEvent as any).requestPermission === 'function'
  );
};

// Trigger haptic feedback
export const triggerHapticFeedback = (options: HapticFeedbackOptions = {}): void => {
  const { type = 'light', duration = 50 } = options;
  
  try {
    // iOS Haptic Feedback (if available)
    if ('Haptics' in window && (window as any).Haptics) {
      const haptics = (window as any).Haptics;
      switch (type) {
        case 'light':
          haptics.impact({ style: 'light' });
          break;
        case 'medium':
          haptics.impact({ style: 'medium' });
          break;
        case 'heavy':
          haptics.impact({ style: 'heavy' });
          break;
        case 'selection':
          haptics.selection();
          break;
        case 'notification':
          haptics.notification({ type: 'success' });
          break;
        default:
          haptics.impact({ style: 'light' });
      }
      return;
    }
    
    // Fallback to vibration API
    if (isHapticSupported()) {
      let pattern: number[];
      
      switch (type) {
        case 'light':
          pattern = [duration];
          break;
        case 'medium':
          pattern = [duration * 1.5];
          break;
        case 'heavy':
          pattern = [duration * 2];
          break;
        case 'selection':
          pattern = [25];
          break;
        case 'impact':
          pattern = [duration, 50, duration];
          break;
        case 'notification':
          pattern = [100, 50, 100];
          break;
        default:
          pattern = [duration];
      }
      
      navigator.vibrate(pattern);
    }
  } catch (error) {
    // Silently fail if haptic feedback is not supported
    console.debug('Haptic feedback not supported:', error);
  }
};

// Specific haptic feedback functions for rosary interactions
export const hapticFeedback = {
  // Light tap for normal bead interaction
  beadTap: () => triggerHapticFeedback({ type: 'light' }),
  
  // Medium feedback for prayer step completion
  stepComplete: () => triggerHapticFeedback({ type: 'medium' }),
  
  // Heavy feedback for decade completion
  decadeComplete: () => triggerHapticFeedback({ type: 'heavy' }),
  
  // Selection feedback for bead selection
  beadSelect: () => triggerHapticFeedback({ type: 'selection' }),
  
  // Notification for prayer completion
  prayerComplete: () => triggerHapticFeedback({ type: 'notification' }),
  
  // Impact feedback for important transitions
  transition: () => triggerHapticFeedback({ type: 'impact' })
};

// Hook to get haptic feedback preference from settings
export const useHapticPreference = (): boolean => {
  try {
    const preference = localStorage.getItem('hapticFeedbackEnabled');
    return preference !== 'false'; // Default to true unless explicitly disabled
  } catch {
    return true; // Default to enabled
  }
};

// Save haptic feedback preference
export const setHapticPreference = (enabled: boolean): void => {
  try {
    localStorage.setItem('hapticFeedbackEnabled', enabled.toString());
  } catch (error) {
    console.warn('Could not save haptic preference:', error);
  }
};