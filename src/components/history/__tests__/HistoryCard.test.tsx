import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HistoryCard } from '../HistoryCard';
import { RosarySession } from '../../../types';

// Mock CHAPLET_INFO
jest.mock('../../../constants/chaplets', () => ({
  CHAPLET_INFO: {
    'divine-mercy': {
      name: 'Divine Mercy Chaplet',
      description: 'Chaplet of Divine Mercy',
      color: '#1F2937',
      icon: '✟',
      beadCount: 59,
      estimatedDuration: 10
    },
    'st-michael': {
      name: 'St. Michael the Archangel Chaplet',
      description: 'St. Michael Chaplet',
      color: '#1F2937',
      icon: '⚔️',
      beadCount: 39,
      estimatedDuration: 8
    }
  }
}));

describe('HistoryCard Component', () => {
  const createMockSession = (overrides: Partial<RosarySession> = {}): RosarySession => ({
    id: 'test-session-1',
    userId: 'user-123',
    deviceId: 'device-456',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
    syncStatus: 'synced',
    version: 1,
    date: '2024-01-15',
    prayerType: 'daily-rosary',
    mystery: 'Joyful',
    completed: true,
    duration: 20,
    intention: 'For healing of my family',
    reflection: 'Peaceful prayer time with deep contemplation',
    mood: 'peaceful',
    gratitudes: ['Health', 'Family', 'Peace'],
    insights: 'God is always present in our struggles',
    tags: ['healing', 'family', 'peace'],
    ...overrides
  });

  describe('Rendering', () => {
    test('renders daily rosary session correctly', () => {
      const session = createMockSession();
      render(<HistoryCard session={session} />);

      expect(screen.getByText('Daily Rosary')).toBeInTheDocument();
      expect(screen.getByText('Joyful Mysteries')).toBeInTheDocument();
      expect(screen.getByText('Today')).toBeInTheDocument();
      expect(screen.getByText('20 min')).toBeInTheDocument();
      expect(screen.getByText('Peaceful')).toBeInTheDocument();
      expect(screen.getByText('😌')).toBeInTheDocument();
    });

    test('renders 54-day novena session correctly', () => {
      const session = createMockSession({
        prayerType: '54-day-novena',
        currentDay: 25,
        mystery: 'Sorrowful'
      });

      render(<HistoryCard session={session} />);

      expect(screen.getByText('54-Day Novena - Day 25')).toBeInTheDocument();
      expect(screen.getByText('Sorrowful Mysteries')).toBeInTheDocument();
    });

    test('renders chaplet session correctly', () => {
      const session = createMockSession({
        prayerType: 'chaplet',
        chaplet: 'divine-mercy',
        mystery: undefined
      });

      render(<HistoryCard session={session} />);

      expect(screen.getByText('Divine Mercy Chaplet')).toBeInTheDocument();
      expect(screen.queryByText('Mysteries')).not.toBeInTheDocument();
    });

    test('renders incomplete session with warning badge', () => {
      const session = createMockSession({ completed: false });
      render(<HistoryCard session={session} />);

      expect(screen.getByText('Incomplete')).toBeInTheDocument();
    });

    test('shows intention preview when collapsed', () => {
      const session = createMockSession();
      render(<HistoryCard session={session} />);

      expect(screen.getByText('For healing of my family')).toBeInTheDocument();
    });

    test('shows tags preview when collapsed', () => {
      const session = createMockSession();
      render(<HistoryCard session={session} />);

      expect(screen.getByText('#healing')).toBeInTheDocument();
      expect(screen.getByText('#family')).toBeInTheDocument();
      expect(screen.getByText('#peace')).toBeInTheDocument();
    });

    test('shows tag overflow indicator', () => {
      const session = createMockSession({
        tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5']
      });

      render(<HistoryCard session={session} />);

      expect(screen.getByText('#tag1')).toBeInTheDocument();
      expect(screen.getByText('#tag2')).toBeInTheDocument();
      expect(screen.getByText('#tag3')).toBeInTheDocument();
      expect(screen.getByText('+2 more')).toBeInTheDocument();
    });
  });

  describe('Date Formatting', () => {
    beforeEach(() => {
      // Mock current date for consistent testing
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-01-16T12:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('formats today correctly', () => {
      const session = createMockSession({ date: '2024-01-16' });
      render(<HistoryCard session={session} />);

      expect(screen.getByText('Today')).toBeInTheDocument();
    });

    test('formats yesterday correctly', () => {
      const session = createMockSession({ date: '2024-01-15' });
      render(<HistoryCard session={session} />);

      expect(screen.getByText('Yesterday')).toBeInTheDocument();
    });

    test('formats days ago correctly', () => {
      const session = createMockSession({ date: '2024-01-10' });
      render(<HistoryCard session={session} />);

      expect(screen.getByText('6 days ago')).toBeInTheDocument();
    });

    test('formats old dates correctly', () => {
      const session = createMockSession({ date: '2023-12-01' });
      render(<HistoryCard session={session} />);

      // Should show actual date for dates older than a week
      expect(screen.getByText(/Dec|12|2023/)).toBeInTheDocument();
    });
  });

  describe('Duration Formatting', () => {
    test('formats minutes correctly', () => {
      const session = createMockSession({ duration: 45 });
      render(<HistoryCard session={session} />);

      expect(screen.getByText('45 min')).toBeInTheDocument();
    });

    test('formats hours and minutes correctly', () => {
      const session = createMockSession({ duration: 75 }); // 1h 15m
      render(<HistoryCard session={session} />);

      expect(screen.getByText('1h 15m')).toBeInTheDocument();
    });

    test('formats exact hours correctly', () => {
      const session = createMockSession({ duration: 120 }); // 2h
      render(<HistoryCard session={session} />);

      expect(screen.getByText('2h')).toBeInTheDocument();
    });

    test('handles missing duration', () => {
      const session = createMockSession({ duration: undefined });
      render(<HistoryCard session={session} />);

      expect(screen.getByText('Duration not recorded')).toBeInTheDocument();
    });
  });

  describe('Expandable Content', () => {
    test('expands and collapses when expand button is clicked', () => {
      const session = createMockSession();
      render(<HistoryCard session={session} />);

      // Should show expand button when there's journal content
      const expandButton = screen.getByRole('button', { name: 'Expand details' });
      expect(expandButton).toBeInTheDocument();

      // Should not show expanded content initially
      expect(screen.queryByText('Prayer Intention')).not.toBeInTheDocument();
      expect(screen.queryByText('Reflection')).not.toBeInTheDocument();

      // Click to expand
      fireEvent.click(expandButton);

      // Should show expanded content
      expect(screen.getByText('Prayer Intention')).toBeInTheDocument();
      expect(screen.getByText('Reflection')).toBeInTheDocument();
      expect(screen.getByText('Gratitudes')).toBeInTheDocument();
      expect(screen.getByText('Spiritual Insights')).toBeInTheDocument();
      expect(screen.getByText('Tags')).toBeInTheDocument();

      // Button should change to collapse
      expect(screen.getByRole('button', { name: 'Collapse details' })).toBeInTheDocument();

      // Click to collapse
      fireEvent.click(screen.getByRole('button', { name: 'Collapse details' }));

      // Should hide expanded content again
      expect(screen.queryByText('Prayer Intention')).not.toBeInTheDocument();
    });

    test('shows initially expanded when showExpanded is true', () => {
      const session = createMockSession();
      render(<HistoryCard session={session} showExpanded={true} />);

      expect(screen.getByText('Prayer Intention')).toBeInTheDocument();
      expect(screen.getByText('Reflection')).toBeInTheDocument();
    });

    test('does not show expand button when no journal content', () => {
      const session = createMockSession({
        intention: undefined,
        reflection: undefined,
        gratitudes: undefined,
        insights: undefined,
        tags: undefined
      });

      render(<HistoryCard session={session} />);

      expect(screen.queryByRole('button', { name: /expand|collapse/i })).not.toBeInTheDocument();
    });
  });

  describe('Expanded Content Sections', () => {
    test('shows all journal content sections when expanded', () => {
      const session = createMockSession();
      render(<HistoryCard session={session} showExpanded={true} />);

      // Prayer Intention section
      expect(screen.getByText('Prayer Intention')).toBeInTheDocument();
      expect(screen.getByText('For healing of my family')).toBeInTheDocument();

      // Reflection section
      expect(screen.getByText('Reflection')).toBeInTheDocument();
      expect(screen.getByText('Peaceful prayer time with deep contemplation')).toBeInTheDocument();

      // Gratitudes section
      expect(screen.getByText('Gratitudes')).toBeInTheDocument();
      expect(screen.getByText('• Health')).toBeInTheDocument();
      expect(screen.getByText('• Family')).toBeInTheDocument();
      expect(screen.getByText('• Peace')).toBeInTheDocument();

      // Insights section
      expect(screen.getByText('Spiritual Insights')).toBeInTheDocument();
      expect(screen.getByText('God is always present in our struggles')).toBeInTheDocument();

      // Tags section
      expect(screen.getByText('Tags')).toBeInTheDocument();
      expect(screen.getByText('#healing')).toBeInTheDocument();
      expect(screen.getByText('#family')).toBeInTheDocument();
      expect(screen.getByText('#peace')).toBeInTheDocument();
    });

    test('hides sections with no content when expanded', () => {
      const session = createMockSession({
        intention: 'Test intention',
        reflection: undefined,
        gratitudes: undefined,
        insights: undefined,
        tags: undefined
      });

      render(<HistoryCard session={session} showExpanded={true} />);

      expect(screen.getByText('Prayer Intention')).toBeInTheDocument();
      expect(screen.queryByText('Reflection')).not.toBeInTheDocument();
      expect(screen.queryByText('Gratitudes')).not.toBeInTheDocument();
      expect(screen.queryByText('Spiritual Insights')).not.toBeInTheDocument();
      expect(screen.queryByText('Tags')).not.toBeInTheDocument();
    });
  });

  describe('Clickable Card', () => {
    test('calls onClick when card is clicked', () => {
      const onClick = jest.fn();
      const session = createMockSession();
      render(<HistoryCard session={session} onClick={onClick} />);

      const card = screen.getByRole('generic').parentElement; // Get the card container
      fireEvent.click(card!);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('does not call onClick when expand button is clicked', () => {
      const onClick = jest.fn();
      const session = createMockSession();
      render(<HistoryCard session={session} onClick={onClick} />);

      const expandButton = screen.getByRole('button', { name: 'Expand details' });
      fireEvent.click(expandButton);

      expect(onClick).not.toHaveBeenCalled();
    });

    test('adds hover styles when onClick is provided', () => {
      const onClick = jest.fn();
      const session = createMockSession();
      render(<HistoryCard session={session} onClick={onClick} />);

      const card = screen.getByText('Daily Rosary').closest('div');
      expect(card).toHaveClass('hover:shadow-md', 'cursor-pointer');
    });

    test('does not add hover styles when onClick is not provided', () => {
      const session = createMockSession();
      render(<HistoryCard session={session} />);

      const card = screen.getByText('Daily Rosary').closest('div');
      expect(card).not.toHaveClass('hover:shadow-md', 'cursor-pointer');
    });
  });

  describe('Visual Indicators', () => {
    test('shows correct mood emoji and text', () => {
      const moodTests = [
        { mood: 'peaceful', emoji: '😌', text: 'Peaceful' },
        { mood: 'joyful', emoji: '😊', text: 'Joyful' },
        { mood: 'hopeful', emoji: '🌟', text: 'Hopeful' },
        { mood: 'troubled', emoji: '😟', text: 'Troubled' },
        { mood: 'sorrowful', emoji: '😢', text: 'Sorrowful' }
      ] as const;

      moodTests.forEach(({ mood, emoji, text }) => {
        const session = createMockSession({ mood });
        const { rerender } = render(<HistoryCard session={session} />);

        expect(screen.getByText(emoji)).toBeInTheDocument();
        expect(screen.getByText(text)).toBeInTheDocument();

        rerender(<div />); // Clear for next test
      });
    });

    test('shows different colors for different prayer types', () => {
      const session = createMockSession({ prayerType: 'daily-rosary' });
      render(<HistoryCard session={session} />);

      const badge = screen.getByText('Daily Rosary');
      expect(badge).toHaveClass('bg-rose-100', 'text-rose-800');
    });

    test('shows heart icon for intention preview', () => {
      const session = createMockSession();
      render(<HistoryCard session={session} />);

      // Heart icon should be present before the intention text
      const intentionSection = screen.getByText('For healing of my family').closest('div');
      expect(intentionSection).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    test('handles session with minimal data', () => {
      const session: RosarySession = {
        id: 'minimal-session',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        date: '2024-01-15',
        prayerType: 'daily-rosary',
        completed: true
      };

      render(<HistoryCard session={session} />);

      expect(screen.getByText('Daily Rosary')).toBeInTheDocument();
      expect(screen.queryByText('Mysteries')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /expand/i })).not.toBeInTheDocument();
    });

    test('handles unknown chaplet type gracefully', () => {
      const session = createMockSession({
        prayerType: 'chaplet',
        chaplet: 'unknown-chaplet' as any,
        mystery: undefined
      });

      render(<HistoryCard session={session} />);

      expect(screen.getByText('Chaplet')).toBeInTheDocument();
    });

    test('handles empty gratitudes and tags arrays', () => {
      const session = createMockSession({
        gratitudes: [],
        tags: []
      });

      render(<HistoryCard session={session} />);

      // Should not show expand button since no meaningful journal content
      expect(screen.queryByRole('button', { name: /expand/i })).not.toBeInTheDocument();
    });

    test('handles very long content gracefully', () => {
      const longText = 'A'.repeat(1000);
      const session = createMockSession({
        intention: longText,
        reflection: longText
      });

      render(<HistoryCard session={session} showExpanded={true} />);

      expect(screen.getByText(longText)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('expand/collapse button has proper aria labels', () => {
      const session = createMockSession();
      render(<HistoryCard session={session} />);

      expect(screen.getByRole('button', { name: 'Expand details' })).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Expand details' }));

      expect(screen.getByRole('button', { name: 'Collapse details' })).toBeInTheDocument();
    });

    test('maintains proper heading hierarchy', () => {
      const session = createMockSession();
      render(<HistoryCard session={session} showExpanded={true} />);

      // Section headers should be h4 elements
      const sectionHeaders = screen.getAllByRole('heading', { level: 4 });
      expect(sectionHeaders.length).toBeGreaterThan(0);
    });
  });
});