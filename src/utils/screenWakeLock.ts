// Screen Wake Lock utilities
let wakeLock: WakeLockSentinel | null = null;

interface NavigatorWithWakeLock extends Navigator {
  wakeLock?: {
    request: (type: 'screen') => Promise<WakeLockSentinel>;
  };
}

interface WakeLockSentinel extends EventTarget {
  release: () => Promise<void>;
  released: boolean;
  type: string;
}

const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

const isIOSSafari = (): boolean => {
  return isIOS() && /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|OPiOS|mercury/.test(navigator.userAgent);
};

export const isWakeLockSupported = (): boolean => {
  // Wake lock is not reliably supported on iOS Safari
  if (isIOSSafari()) {
    return false;
  }
  return 'wakeLock' in navigator;
};

export const requestWakeLock = async (): Promise<boolean> => {
  if (!isWakeLockSupported()) {
    console.log('Wake Lock API not supported');
    return false;
  }

  try {
    const nav = navigator as NavigatorWithWakeLock;
    wakeLock = await nav.wakeLock!.request('screen');
    
    wakeLock.addEventListener('release', () => {
      console.log('Wake lock released');
    });

    console.log('Wake lock acquired');
    return true;
  } catch (err) {
    console.error('Failed to acquire wake lock:', err);
    return false;
  }
};

export const releaseWakeLock = async (): Promise<void> => {
  if (wakeLock && !wakeLock.released) {
    try {
      await wakeLock.release();
      wakeLock = null;
      console.log('Wake lock released manually');
    } catch (err) {
      console.error('Failed to release wake lock:', err);
    }
  }
};

export const isWakeLockActive = (): boolean => {
  return wakeLock !== null && !wakeLock.released;
};

// Preference management
export const getKeepScreenAwakePreference = (): boolean => {
  const stored = localStorage.getItem('keep-screen-awake');
  return stored !== null ? stored === 'true' : true; // Default to true
};

export const setKeepScreenAwakePreference = (enabled: boolean): void => {
  localStorage.setItem('keep-screen-awake', enabled.toString());
};