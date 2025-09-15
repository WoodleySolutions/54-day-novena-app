// Audio feedback utility for prayer transitions
export interface AudioFeedbackOptions {
  type?: 'beep' | 'chime' | 'bell' | 'soft' | 'notification';
  volume?: number; // 0.0 to 1.0
  frequency?: number; // Hz for tone generation
  duration?: number; // milliseconds
}

// Generate tone using Web Audio API
const generateTone = (frequency: number, duration: number, volume: number = 0.3): void => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create oscillator for tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Configure oscillator
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    
    // Configure volume envelope (fade in/out for smooth sound)
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + duration / 1000 - 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration / 1000);
    
    // Play tone
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
    
  } catch (error) {
    console.debug('Audio feedback not supported:', error);
  }
};

// Generate chord (multiple frequencies)
const generateChord = (frequencies: number[], duration: number, volume: number = 0.2): void => {
  frequencies.forEach(freq => generateTone(freq, duration, volume));
};

// Check if audio feedback is supported
export const isAudioSupported = (): boolean => {
  return typeof window !== 'undefined' && 
         !!(window.AudioContext || (window as any).webkitAudioContext);
};

// Trigger audio feedback
export const triggerAudioFeedback = (options: AudioFeedbackOptions = {}): void => {
  const { type = 'soft', volume = 0.3, frequency = 440, duration = 200 } = options;
  
  if (!isAudioSupported()) {
    return;
  }
  
  try {
    switch (type) {
      case 'beep':
        generateTone(800, 100, volume);
        break;
        
      case 'chime':
        // Pleasant chime sound (major chord)
        generateChord([523.25, 659.25, 783.99], duration, volume); // C5, E5, G5
        break;
        
      case 'bell':
        // Bell-like sound with harmonics
        generateTone(440, duration, volume);
        setTimeout(() => generateTone(880, duration / 2, volume * 0.5), 50);
        break;
        
      case 'soft':
        // Gentle, unobtrusive tone
        generateTone(523.25, 150, volume * 0.5); // C5
        break;
        
      case 'notification':
        // Two-tone notification
        generateTone(659.25, 100, volume); // E5
        setTimeout(() => generateTone(523.25, 100, volume), 120); // C5
        break;
        
      default:
        generateTone(frequency, duration, volume);
    }
  } catch (error) {
    console.debug('Could not play audio feedback:', error);
  }
};

// Specific audio feedback functions for rosary interactions
export const audioFeedback = {
  // Soft chime for bead transitions
  beadTransition: () => triggerAudioFeedback({ type: 'soft', volume: 0.2 }),
  
  // Pleasant chime for decade completion
  decadeComplete: () => triggerAudioFeedback({ type: 'chime', volume: 0.3, duration: 300 }),
  
  // Bell sound for mystery transitions
  mysteryTransition: () => triggerAudioFeedback({ type: 'bell', volume: 0.25, duration: 250 }),
  
  // Notification for prayer completion
  prayerComplete: () => triggerAudioFeedback({ type: 'notification', volume: 0.4 }),
  
  // Gentle beep for step advance
  stepAdvance: () => triggerAudioFeedback({ type: 'beep', volume: 0.15 })
};

// Hook to get audio feedback preference from settings
export const useAudioPreference = (): boolean => {
  try {
    const preference = localStorage.getItem('audioFeedbackEnabled');
    return preference === 'true'; // Default to false (opt-in)
  } catch {
    return false; // Default to disabled
  }
};

// Save audio feedback preference
export const setAudioPreference = (enabled: boolean): void => {
  try {
    localStorage.setItem('audioFeedbackEnabled', enabled.toString());
  } catch (error) {
    console.warn('Could not save audio preference:', error);
  }
};

// Get audio volume preference
export const getAudioVolume = (): number => {
  try {
    const volume = localStorage.getItem('audioFeedbackVolume');
    return volume ? parseFloat(volume) : 0.3;
  } catch {
    return 0.3; // Default volume
  }
};

// Save audio volume preference
export const setAudioVolume = (volume: number): void => {
  try {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    localStorage.setItem('audioFeedbackVolume', clampedVolume.toString());
  } catch (error) {
    console.warn('Could not save audio volume:', error);
  }
};