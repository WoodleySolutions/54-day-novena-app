// Device ID management
const getDeviceId = (): string => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
    });
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

export interface UserRegistrationData {
  email: string;
  marketingConsent: boolean;
  prayerReminders: boolean;
  newsletter: boolean;
}

export interface SubscriptionStatus {
  hasAccess: boolean;
  accessType: 'none' | 'premium' | 'expired';
  trialEligible: boolean;
  user?: {
    email: string;
    deviceId: string;
    registeredAt: string;
  };
  subscription?: {
    platform: string;
    isActive: boolean;
    expiresAt?: string;
  };
  checkedAt: string;
}

const API_BASE = '/.netlify/functions';

export const subscriptionService = {
  // Register user with email
  registerUser: async (data: UserRegistrationData): Promise<void> => {
    const response = await fetch(`${API_BASE}/register-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        deviceId: getDeviceId()
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to register user');
    }

    const result = await response.json();

    // Store email locally for future API calls
    localStorage.setItem('userEmail', data.email);

    return result;
  },

  // Check subscription status
  checkSubscriptionStatus: async (email?: string): Promise<SubscriptionStatus> => {
    const userEmail = email || localStorage.getItem('userEmail');
    const deviceId = getDeviceId();

    const params = new URLSearchParams();
    if (userEmail) params.append('email', userEmail);
    params.append('deviceId', deviceId);

    const response = await fetch(`${API_BASE}/subscription-status?${params}`);

    if (!response.ok) {
      console.error('Failed to check subscription status');
      // Return default state if API fails
      return {
        hasAccess: false,
        accessType: 'none',
        trialEligible: true,
        checkedAt: new Date().toISOString()
      };
    }

    return response.json();
  },

  // Get stored user email
  getUserEmail: (): string | null => {
    return localStorage.getItem('userEmail');
  },

  // Check if user has provided email
  hasUserEmail: (): boolean => {
    return !!localStorage.getItem('userEmail');
  },

  // Get device ID (useful for debugging)
  getDeviceId: (): string => {
    return getDeviceId();
  }
};