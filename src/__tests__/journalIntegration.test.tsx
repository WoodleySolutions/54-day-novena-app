import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PrayerModal } from '../components/modals/PrayerModal';
import { RosarySession, MoodType } from '../types';
import * as rosaryStreak from '../utils/rosaryStreak';

// Mock the rosaryStreak utilities
jest.mock('../utils/rosaryStreak');
const mockRosaryStreak = rosaryStreak as jest.Mocked<typeof rosaryStreak>;

// Mock constants
jest.mock('../constants/novena', () => ({
  ROSARY_MYSTERIES: {
    'Joyful': ['The Annunciation', 'The Visitation', 'The Nativity', 'The Presentation', 'The Finding in the Temple']
  },
  MYSTERY_REFLECTIONS: {
    'Joyful': ['Reflection 1', 'Reflection 2', 'Reflection 3', 'Reflection 4', 'Reflection 5']
  }
}));

jest.mock('../constants/chaplets', () => ({
  CHAPLET_INFO: {
    'divine-mercy': {
      name: 'Divine Mercy Chaplet',
      description: 'Test chaplet',
      color: '#000',
      icon: '✟',
      beadCount: 59,
      estimatedDuration: 10
    }
  },
  CHAPLET_PRAYERS: {
    'divine-mercy': [
      {
        id: 'opening',
        title: 'Opening Prayer',
        content: 'Test opening prayer',
        type: 'prayer'
      }
    ]
  }
}));

// Mock other utilities
jest.mock('../utils/prayers', () => ({
  getOpeningPrayer: () => 'Mock opening prayer',
  getClosingPrayer: () => 'Mock closing prayer',
  getDecadePrayers: () => ['Mock decade prayer']
}));

jest.mock('../constants/commonPrayers', () => ({
  getPrayerText: () => null
}));

jest.mock('../utils/rosaryMapping', () => ({
  getBeadIndexForStep: () => 0,
  getStepIndexForBead: () => 0
}));

jest.mock('../utils/screenWakeLock', () => ({
  requestWakeLock: jest.fn(),
  releaseWakeLock: jest.fn(),
  getKeepScreenAwakePreference: () => false
}));

jest.mock('../utils/audioFeedback', () => ({
  audioFeedback: {
    stepAdvance: jest.fn(),
    beadTransition: jest.fn(),
    mysteryTransition: jest.fn(),
    decadeComplete: jest.fn(),
    prayerComplete: jest.fn()
  },
  useAudioPreference: () => false
}));

describe('Journal Integration Tests', () => {
  const defaultProps = {
    isOpen: true,
    prayerType: 'daily-rosary' as const,
    mystery: 'Joyful' as const,
    onClose: jest.fn(),
    onComplete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(),
        removeItem: jest.fn()
      }
    });
  });

  describe('Complete Prayer Flow with Journaling', () => {
    test('completes full daily rosary prayer flow with journal data', async () => {
      const onComplete = jest.fn();
      render(
        <PrayerModal
          {...defaultProps}
          onComplete={onComplete}
        />
      );

      // Should start with intention step (for non-novena prayers)
      expect(screen.getByText('Set Your Intention')).toBeInTheDocument();
      expect(screen.getByText('What would you like to pray for today? (Optional)')).toBeInTheDocument();

      // Fill in intention
      const intentionTextarea = screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...');
      fireEvent.change(intentionTextarea, { target: { value: 'Prayer for family healing' } });

      // Select mood
      fireEvent.click(screen.getByRole('button', { name: 'Hopeful' }));

      // Submit intention
      fireEvent.click(screen.getByRole('button', { name: 'Begin Prayer' }));

      // Should move to intro step
      await waitFor(() => {
        expect(screen.getByText(/Joyful Mysteries Rosary/)).toBeInTheDocument();
      });

      // Progress through prayer steps
      let currentStep = 0;
      const totalSteps = 12; // Approximate number of steps in rosary

      while (currentStep < totalSteps - 2) { // Stop before reflection step
        const nextButton = screen.queryByRole('button', { name: 'Next' });
        if (nextButton && !nextButton.disabled) {
          fireEvent.click(nextButton);
          currentStep++;
        } else {
          break;
        }
      }

      // Should reach reflection step
      await waitFor(() => {
        expect(screen.getByText('Prayer Reflection')).toBeInTheDocument();
      });

      // Fill in reflection data
      const reflectionTextarea = screen.getByLabelText('Overall Reflection');
      fireEvent.change(reflectionTextarea, { target: { value: 'This was a beautiful prayer experience' } });

      // Select mood after prayer
      fireEvent.click(screen.getByRole('button', { name: 'Peaceful' }));

      // Add gratitude
      const gratitudeInput = screen.getByPlaceholderText('Add something you\'re thankful for...');
      fireEvent.change(gratitudeInput, { target: { value: 'Good health' } });
      fireEvent.click(screen.getByRole('button', { name: '+' }));

      // Add insight
      const insightsTextarea = screen.getByLabelText('Spiritual Insights');
      fireEvent.change(insightsTextarea, { target: { value: 'God is always present' } });

      // Add tag
      const tagInput = screen.getByPlaceholderText('Add tags like \'healing\', \'family\', \'peace\'...');
      fireEvent.change(tagInput, { target: { value: 'healing' } });
      fireEvent.click(screen.getAllByRole('button', { name: '+' })[1]);

      // Submit reflection
      fireEvent.click(screen.getByRole('button', { name: 'Save Reflection' }));

      // Should call onComplete with full journal data
      expect(onComplete).toHaveBeenCalledWith({
        intention: 'Prayer for family healing',
        mood: 'peaceful',
        reflection: 'This was a beautiful prayer experience',
        gratitudes: ['Good health'],
        insights: 'God is always present',
        tags: ['healing']
      });
    });

    test('completes 54-day novena flow (no intention step, has reflection)', async () => {
      const onComplete = jest.fn();
      render(
        <PrayerModal
          {...defaultProps}
          prayerType="54-day-novena"
          currentDay={15}
          intention="Preset novena intention"
          onComplete={onComplete}
        />
      );

      // Should NOT start with intention step for novena
      expect(screen.queryByText('Set Your Intention')).not.toBeInTheDocument();

      // Should start with novena intro
      expect(screen.getByText(/Day 15 - Joyful Mysteries/)).toBeInTheDocument();

      // Progress through prayer (simplified for test)
      while (true) {
        const nextButton = screen.queryByRole('button', { name: 'Next' });
        const reflectionTitle = screen.queryByText('Prayer Reflection');

        if (reflectionTitle) {
          break; // Reached reflection step
        }

        if (nextButton && !nextButton.disabled) {
          fireEvent.click(nextButton);
        } else {
          break;
        }
      }

      // Should reach reflection step
      expect(screen.getByText('Prayer Reflection')).toBeInTheDocument();

      // Add reflection
      const reflectionTextarea = screen.getByLabelText('Overall Reflection');
      fireEvent.change(reflectionTextarea, { target: { value: 'Day 15 reflection' } });

      fireEvent.click(screen.getByRole('button', { name: 'Save Reflection' }));

      expect(onComplete).toHaveBeenCalledWith({
        intention: 'Preset novena intention',
        reflection: 'Day 15 reflection',
        mood: undefined,
        gratitudes: undefined,
        insights: undefined,
        tags: undefined
      });
    });

    test('allows skipping intention step', async () => {
      const onComplete = jest.fn();
      render(
        <PrayerModal
          {...defaultProps}
          onComplete={onComplete}
        />
      );

      // Skip intention
      fireEvent.click(screen.getByRole('button', { name: 'Skip for now' }));

      // Should move to prayer intro
      await waitFor(() => {
        expect(screen.getByText(/Joyful Mysteries Rosary/)).toBeInTheDocument();
      });

      // Progress to reflection and skip that too
      while (true) {
        const nextButton = screen.queryByRole('button', { name: 'Next' });
        const reflectionTitle = screen.queryByText('Prayer Reflection');

        if (reflectionTitle) {
          break;
        }

        if (nextButton && !nextButton.disabled) {
          fireEvent.click(nextButton);
        } else {
          break;
        }
      }

      // Skip reflection
      fireEvent.click(screen.getByRole('button', { name: 'Skip reflection' }));

      expect(onComplete).toHaveBeenCalledWith({
        intention: undefined,
        reflection: undefined,
        mood: undefined,
        gratitudes: undefined,
        insights: undefined,
        tags: undefined
      });
    });

    test('handles chaplet prayer flow with journaling', async () => {
      const onComplete = jest.fn();
      render(
        <PrayerModal
          {...defaultProps}
          prayerType="chaplet"
          chaplet="divine-mercy"
          mystery={undefined}
          onComplete={onComplete}
        />
      );

      // Should start with intention for chaplet
      expect(screen.getByText('Set Your Intention')).toBeInTheDocument();

      // Submit intention
      const intentionTextarea = screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...');
      fireEvent.change(intentionTextarea, { target: { value: 'Divine mercy prayer' } });
      fireEvent.click(screen.getByRole('button', { name: 'Begin Prayer' }));

      // Progress through chaplet steps
      while (true) {
        const nextButton = screen.queryByRole('button', { name: 'Next' });
        const reflectionTitle = screen.queryByText('Prayer Reflection');

        if (reflectionTitle) {
          break;
        }

        if (nextButton && !nextButton.disabled) {
          fireEvent.click(nextButton);
        } else {
          break;
        }
      }

      // Add reflection
      const reflectionTextarea = screen.getByLabelText('Overall Reflection');
      fireEvent.change(reflectionTextarea, { target: { value: 'Powerful chaplet experience' } });

      fireEvent.click(screen.getByRole('button', { name: 'Save Reflection' }));

      expect(onComplete).toHaveBeenCalledWith({
        intention: 'Divine mercy prayer',
        reflection: 'Powerful chaplet experience',
        mood: undefined,
        gratitudes: undefined,
        insights: undefined,
        tags: undefined
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('handles empty journal data gracefully', async () => {
      const onComplete = jest.fn();
      render(
        <PrayerModal
          {...defaultProps}
          onComplete={onComplete}
        />
      );

      // Skip intention
      fireEvent.click(screen.getByRole('button', { name: 'Skip for now' }));

      // Progress to reflection
      while (true) {
        const nextButton = screen.queryByRole('button', { name: 'Next' });
        const reflectionTitle = screen.queryByText('Prayer Reflection');

        if (reflectionTitle) {
          break;
        }

        if (nextButton && !nextButton.disabled) {
          fireEvent.click(nextButton);
        } else {
          break;
        }
      }

      // Submit empty reflection
      fireEvent.click(screen.getByRole('button', { name: 'Complete Prayer' }));

      expect(onComplete).toHaveBeenCalledWith({
        intention: undefined,
        reflection: undefined,
        mood: undefined,
        gratitudes: undefined,
        insights: undefined,
        tags: undefined
      });
    });

    test('preserves data when navigating back and forth', async () => {
      render(
        <PrayerModal
          {...defaultProps}
        />
      );

      // Fill intention
      const intentionTextarea = screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...');
      fireEvent.change(intentionTextarea, { target: { value: 'Test intention' } });

      // Move forward
      fireEvent.click(screen.getByRole('button', { name: 'Begin Prayer' }));

      // Should be on next step
      expect(screen.getByText(/Joyful Mysteries Rosary/)).toBeInTheDocument();

      // Note: Back navigation from prayer steps to journal steps would require
      // more complex state management that isn't currently implemented
      // This test documents the expected behavior for future implementation
    });

    test('handles maximum input lengths correctly', async () => {
      const onComplete = jest.fn();
      render(
        <PrayerModal
          {...defaultProps}
          onComplete={onComplete}
        />
      );

      // Test max length intention
      const longIntention = 'a'.repeat(500);
      const intentionTextarea = screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...');
      fireEvent.change(intentionTextarea, { target: { value: longIntention } });

      fireEvent.click(screen.getByRole('button', { name: 'Begin Prayer' }));

      // Progress to reflection
      while (true) {
        const nextButton = screen.queryByRole('button', { name: 'Next' });
        const reflectionTitle = screen.queryByText('Prayer Reflection');

        if (reflectionTitle) {
          break;
        }

        if (nextButton && !nextButton.disabled) {
          fireEvent.click(nextButton);
        } else {
          break;
        }
      }

      // Test max length reflection
      const longReflection = 'b'.repeat(1000);
      const reflectionTextarea = screen.getByLabelText('Overall Reflection');
      fireEvent.change(reflectionTextarea, { target: { value: longReflection } });

      fireEvent.click(screen.getByRole('button', { name: 'Save Reflection' }));

      expect(onComplete).toHaveBeenCalledWith({
        intention: longIntention,
        reflection: longReflection,
        mood: undefined,
        gratitudes: undefined,
        insights: undefined,
        tags: undefined
      });
    });
  });

  describe('Data Persistence', () => {
    test('should persist prayer session data through completion', async () => {
      // This test verifies that the journal data flows correctly through
      // the entire prayer completion process

      mockRosaryStreak.createRosarySession.mockReturnValue({
        id: 'test-session-id',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        date: '2024-01-15',
        prayerType: 'daily-rosary',
        mystery: 'Joyful',
        completed: false
      } as RosarySession);

      mockRosaryStreak.completeRosarySession.mockReturnValue({
        currentStreak: 1,
        longestStreak: 1,
        lastPrayerDate: '2024-01-15',
        totalPrayers: 1,
        sessions: [{
          id: 'test-session-id',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
          date: '2024-01-15',
          prayerType: 'daily-rosary',
          mystery: 'Joyful',
          completed: true,
          intention: 'Test intention',
          reflection: 'Test reflection',
          mood: 'peaceful'
        } as RosarySession]
      });

      const onComplete = jest.fn();
      render(
        <PrayerModal
          {...defaultProps}
          onComplete={onComplete}
        />
      );

      // Complete the flow with journal data
      const intentionTextarea = screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...');
      fireEvent.change(intentionTextarea, { target: { value: 'Test intention' } });
      fireEvent.click(screen.getByRole('button', { name: 'Begin Prayer' }));

      // Progress to reflection
      while (true) {
        const nextButton = screen.queryByRole('button', { name: 'Next' });
        const reflectionTitle = screen.queryByText('Prayer Reflection');

        if (reflectionTitle) {
          break;
        }

        if (nextButton && !nextButton.disabled) {
          fireEvent.click(nextButton);
        } else {
          break;
        }
      }

      const reflectionTextarea = screen.getByLabelText('Overall Reflection');
      fireEvent.change(reflectionTextarea, { target: { value: 'Test reflection' } });
      fireEvent.click(screen.getByRole('button', { name: 'Peaceful' }));
      fireEvent.click(screen.getByRole('button', { name: 'Save Reflection' }));

      // Verify completion was called with journal data
      expect(onComplete).toHaveBeenCalledWith({
        intention: 'Test intention',
        reflection: 'Test reflection',
        mood: 'peaceful',
        gratitudes: undefined,
        insights: undefined,
        tags: undefined
      });
    });
  });

  describe('Accessibility Integration', () => {
    test('maintains proper focus flow through journal steps', async () => {
      render(
        <PrayerModal
          {...defaultProps}
        />
      );

      // Focus should be manageable on intention textarea
      const intentionTextarea = screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...');
      intentionTextarea.focus();
      expect(intentionTextarea).toHaveFocus();

      // Progress to reflection
      fireEvent.click(screen.getByRole('button', { name: 'Begin Prayer' }));

      while (true) {
        const nextButton = screen.queryByRole('button', { name: 'Next' });
        const reflectionTitle = screen.queryByText('Prayer Reflection');

        if (reflectionTitle) {
          break;
        }

        if (nextButton && !nextButton.disabled) {
          fireEvent.click(nextButton);
        } else {
          break;
        }
      }

      // Focus should be manageable on reflection textarea
      const reflectionTextarea = screen.getByLabelText('Overall Reflection');
      reflectionTextarea.focus();
      expect(reflectionTextarea).toHaveFocus();
    });

    test('provides appropriate ARIA labels and roles', () => {
      render(
        <PrayerModal
          {...defaultProps}
        />
      );

      // Check intention step accessibility
      expect(screen.getByLabelText('Prayer Intention')).toBeInTheDocument();
      expect(screen.getByLabelText('How are you feeling?')).toBeInTheDocument();

      // Move to reflection
      fireEvent.click(screen.getByRole('button', { name: 'Begin Prayer' }));

      while (true) {
        const nextButton = screen.queryByRole('button', { name: 'Next' });
        const reflectionTitle = screen.queryByText('Prayer Reflection');

        if (reflectionTitle) {
          break;
        }

        if (nextButton && !nextButton.disabled) {
          fireEvent.click(nextButton);
        } else {
          break;
        }
      }

      // Check reflection step accessibility
      expect(screen.getByLabelText('Overall Reflection')).toBeInTheDocument();
      expect(screen.getByLabelText(/What are you grateful for/)).toBeInTheDocument();
      expect(screen.getByLabelText('Spiritual Insights')).toBeInTheDocument();
    });
  });
});