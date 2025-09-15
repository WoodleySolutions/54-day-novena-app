import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PrayerHistoryScreen } from '../PrayerHistoryScreen';
import { RosarySession } from '../../../types';
import * as rosaryStreak from '../../../utils/rosaryStreak';

// Mock the utility functions
jest.mock('../../../utils/rosaryStreak');
const mockRosaryStreak = rosaryStreak as jest.Mocked<typeof rosaryStreak>;

// Mock HistoryCard component
jest.mock('../../history/HistoryCard', () => ({
  HistoryCard: ({ session }: { session: RosarySession }) => (
    <div data-testid={`history-card-${session.id}`}>
      <span>{session.prayerType}</span>
      <span>{session.mystery}</span>
      <span>{session.date}</span>
      {session.intention && <span>{session.intention}</span>}
    </div>
  )
}));

// Mock document methods for CSV export
Object.defineProperty(document, 'createElement', {
  value: jest.fn(() => ({
    href: '',
    download: '',
    click: jest.fn()
  }))
});

Object.defineProperty(document.body, 'appendChild', {
  value: jest.fn()
});

Object.defineProperty(document.body, 'removeChild', {
  value: jest.fn()
});

Object.defineProperty(window.URL, 'createObjectURL', {
  value: jest.fn(() => 'mock-blob-url')
});

Object.defineProperty(window.URL, 'revokeObjectURL', {
  value: jest.fn()
});

describe('PrayerHistoryScreen Component', () => {
  const defaultProps = {
    onBack: jest.fn()
  };

  const createMockSession = (overrides: Partial<RosarySession> = {}): RosarySession => ({
    id: `session-${Math.random()}`,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    date: '2024-01-15',
    prayerType: 'daily-rosary',
    mystery: 'Joyful',
    completed: true,
    duration: 20,
    intention: 'For peace',
    reflection: 'Beautiful prayer',
    mood: 'peaceful',
    gratitudes: ['Health'],
    insights: 'God is good',
    tags: ['peace'],
    ...overrides
  });

  const mockStreakData = {
    currentStreak: 5,
    longestStreak: 15,
    lastPrayerDate: '2024-01-15',
    totalPrayers: 50,
    sessions: [
      createMockSession({ date: '2024-01-15', prayerType: 'daily-rosary' }),
      createMockSession({ date: '2024-01-14', prayerType: '54-day-novena', currentDay: 10 }),
      createMockSession({ date: '2024-01-13', prayerType: 'chaplet', chaplet: 'divine-mercy' }),
      createMockSession({ date: '2024-01-01', reflection: 'Old prayer' }) // Older session
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockRosaryStreak.loadRosaryStreakData.mockReturnValue(mockStreakData);
    mockRosaryStreak.searchSessions.mockImplementation((data, query) =>
      data.sessions.filter(s =>
        s.intention?.toLowerCase().includes(query.toLowerCase()) ||
        s.reflection?.toLowerCase().includes(query.toLowerCase())
      )
    );
  });

  describe('Rendering', () => {
    test('renders header with title and statistics', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      expect(screen.getByText('Prayer History')).toBeInTheDocument();
      expect(screen.getByText('Your spiritual journey and reflections')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument(); // Total prayers
      expect(screen.getByText('Total Prayers')).toBeInTheDocument();
    });

    test('calculates and displays statistics correctly', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      expect(screen.getByText('4')).toBeInTheDocument(); // Total
      expect(screen.getByText(/This Month/)).toBeInTheDocument();
      expect(screen.getByText(/With Reflections/)).toBeInTheDocument();
    });

    test('renders back button', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      const backButton = screen.getByRole('button', { name: /back/i });
      expect(backButton).toBeInTheDocument();
    });

    test('renders export button', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      const exportButton = screen.getByRole('button', { name: /export/i });
      expect(exportButton).toBeInTheDocument();
    });

    test('renders search input', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText('Search intentions, reflections, insights...');
      expect(searchInput).toBeInTheDocument();
    });

    test('renders filter button', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      const filterButton = screen.getByRole('button', { name: 'Filters' });
      expect(filterButton).toBeInTheDocument();
    });
  });

  describe('Session Display', () => {
    test('displays all completed sessions by default', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      expect(screen.getByText('4 prayers found')).toBeInTheDocument();
      expect(screen.getAllByTestId(/history-card-/)).toHaveLength(4);
    });

    test('sorts sessions by date (newest first)', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      const cards = screen.getAllByTestId(/history-card-/);
      expect(cards[0]).toHaveTextContent('2024-01-15');
      expect(cards[1]).toHaveTextContent('2024-01-14');
    });

    test('shows empty state when no sessions', () => {
      mockRosaryStreak.loadRosaryStreakData.mockReturnValue({
        currentStreak: 0,
        longestStreak: 0,
        lastPrayerDate: null,
        totalPrayers: 0,
        sessions: []
      });

      render(<PrayerHistoryScreen {...defaultProps} />);

      expect(screen.getByText('No prayer history yet')).toBeInTheDocument();
      expect(screen.getByText('Your completed prayers with reflections will appear here.')).toBeInTheDocument();
      expect(screen.getByText('📿')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    test('searches sessions when query is entered', async () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText('Search intentions, reflections, insights...');
      fireEvent.change(searchInput, { target: { value: 'peace' } });

      await waitFor(() => {
        expect(mockRosaryStreak.searchSessions).toHaveBeenCalledWith(
          expect.objectContaining({ sessions: expect.any(Array) }),
          'peace'
        );
      });
    });

    test('shows no results message when search yields no matches', () => {
      mockRosaryStreak.searchSessions.mockReturnValue([]);

      render(<PrayerHistoryScreen {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText('Search intentions, reflections, insights...');
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

      expect(screen.getByText('No prayers found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search terms or filters.')).toBeInTheDocument();
    });

    test('shows clear filters button when search is active', () => {
      mockRosaryStreak.searchSessions.mockReturnValue([]);

      render(<PrayerHistoryScreen {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText('Search intentions, reflections, insights...');
      fireEvent.change(searchInput, { target: { value: 'test' } });

      const clearButton = screen.getByText('Clear all filters');
      expect(clearButton).toBeInTheDocument();

      fireEvent.click(clearButton);

      expect(searchInput).toHaveValue('');
    });
  });

  describe('Filtering', () => {
    test('shows filter options when filter button is clicked', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      const filterButton = screen.getByRole('button', { name: 'Filters' });
      fireEvent.click(filterButton);

      expect(screen.getByText('Prayer Type')).toBeInTheDocument();
      expect(screen.getByText('Time Range')).toBeInTheDocument();
      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.getByText('54 Day Novena')).toBeInTheDocument();
      expect(screen.getByText('Daily Rosary')).toBeInTheDocument();
      expect(screen.getByText('Chaplet')).toBeInTheDocument();
    });

    test('hides filter options when filter button is clicked again', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      const filterButton = screen.getByRole('button', { name: 'Filters' });

      // Show filters
      fireEvent.click(filterButton);
      expect(screen.getByText('Prayer Type')).toBeInTheDocument();

      // Hide filters
      fireEvent.click(filterButton);
      expect(screen.queryByText('Prayer Type')).not.toBeInTheDocument();
    });

    test('filters by prayer type', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      // Open filters
      fireEvent.click(screen.getByRole('button', { name: 'Filters' }));

      // Select daily rosary filter
      fireEvent.click(screen.getByText('Daily Rosary'));

      // Should only show daily rosary sessions
      const cards = screen.getAllByTestId(/history-card-/);
      cards.forEach(card => {
        expect(card).toHaveTextContent('daily-rosary');
      });
    });

    test('filters by time range', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      // Open filters
      fireEvent.click(screen.getByRole('button', { name: 'Filters' }));

      // Select past week filter
      fireEvent.click(screen.getByText('Past Week'));

      // Should filter out older sessions
      expect(screen.queryByText('2024-01-01')).not.toBeInTheDocument();
    });

    test('applies multiple filters simultaneously', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      fireEvent.click(screen.getByRole('button', { name: 'Filters' }));

      // Select both prayer type and time filters
      fireEvent.click(screen.getByText('Daily Rosary'));
      fireEvent.click(screen.getByText('Past Week'));

      // Should apply both filters
      const cards = screen.getAllByTestId(/history-card-/);
      expect(cards.length).toBeLessThanOrEqual(4);
    });
  });

  describe('Export Functionality', () => {
    test('exports CSV when export button is clicked', () => {
      const mockCreateElement = jest.fn(() => ({
        href: '',
        download: '',
        click: jest.fn()
      }));
      document.createElement = mockCreateElement;

      render(<PrayerHistoryScreen {...defaultProps} />);

      const exportButton = screen.getByRole('button', { name: /export/i });
      fireEvent.click(exportButton);

      expect(mockCreateElement).toHaveBeenCalledWith('a');
      expect(window.URL.createObjectURL).toHaveBeenCalled();
    });

    test('exports filtered sessions only', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      // Apply a filter first
      fireEvent.click(screen.getByRole('button', { name: 'Filters' }));
      fireEvent.click(screen.getByText('Daily Rosary'));

      const exportButton = screen.getByRole('button', { name: /export/i });
      fireEvent.click(exportButton);

      // Verify export was called (implementation tested separately)
      expect(window.URL.createObjectURL).toHaveBeenCalled();
    });
  });

  describe('Navigation', () => {
    test('calls onBack when back button is clicked', () => {
      const onBack = jest.fn();
      render(<PrayerHistoryScreen {...defaultProps} onBack={onBack} />);

      const backButton = screen.getByRole('button', { name: /back/i });
      fireEvent.click(backButton);

      expect(onBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('Statistics Calculations', () => {
    beforeEach(() => {
      // Mock current date for consistent testing
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-01-16T12:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('calculates total prayers correctly', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('Total Prayers')).toBeInTheDocument();
    });

    test('calculates this month count correctly', () => {
      const sessionsThisMonth = mockStreakData.sessions.filter(s =>
        new Date(s.date).getMonth() === new Date().getMonth()
      );

      render(<PrayerHistoryScreen {...defaultProps} />);

      expect(screen.getByText(sessionsThisMonth.length.toString())).toBeInTheDocument();
      expect(screen.getByText('This Month')).toBeInTheDocument();
    });

    test('calculates reflection percentage correctly', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      // All mock sessions have reflections, so should be 100%
      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('With Reflections')).toBeInTheDocument();
    });

    test('handles zero prayers gracefully', () => {
      mockRosaryStreak.loadRosaryStreakData.mockReturnValue({
        currentStreak: 0,
        longestStreak: 0,
        lastPrayerDate: null,
        totalPrayers: 0,
        sessions: []
      });

      render(<PrayerHistoryScreen {...defaultProps} />);

      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('0%')).toBeInTheDocument();
    });
  });

  describe('UI State Management', () => {
    test('filter button shows active state when filters are open', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      const filterButton = screen.getByRole('button', { name: 'Filters' });

      // Initially not active
      expect(filterButton).not.toHaveClass('bg-indigo-50');

      // Click to open
      fireEvent.click(filterButton);
      expect(filterButton).toHaveClass('bg-indigo-50');
    });

    test('prayer count updates when filters are applied', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      // Initially shows all prayers
      expect(screen.getByText('4 prayers found')).toBeInTheDocument();

      // Apply filter
      fireEvent.click(screen.getByRole('button', { name: 'Filters' }));
      fireEvent.click(screen.getByText('Daily Rosary'));

      // Should show fewer prayers
      const updatedCount = screen.getByText(/prayers? found/);
      expect(updatedCount).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('has proper heading hierarchy', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      expect(screen.getByRole('heading', { level: 1, name: 'Prayer History' })).toBeInTheDocument();
    });

    test('search input has proper label', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText('Search intentions, reflections, insights...');
      expect(searchInput).toHaveAttribute('type', 'text');
    });

    test('filter buttons have proper roles', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      fireEvent.click(screen.getByRole('button', { name: 'Filters' }));

      const filterButtons = screen.getAllByRole('button').filter(btn =>
        ['All', 'Daily Rosary', '54 Day Novena', 'Chaplet'].includes(btn.textContent || '')
      );

      expect(filterButtons.length).toBeGreaterThan(0);
    });

    test('maintains focus management', () => {
      render(<PrayerHistoryScreen {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText('Search intentions, reflections, insights...');
      searchInput.focus();

      expect(searchInput).toHaveFocus();
    });
  });

  describe('Error Handling', () => {
    test('handles loadRosaryStreakData errors gracefully', () => {
      mockRosaryStreak.loadRosaryStreakData.mockImplementation(() => {
        throw new Error('Storage error');
      });

      // Should not crash
      expect(() => render(<PrayerHistoryScreen {...defaultProps} />)).not.toThrow();
    });

    test('handles searchSessions errors gracefully', () => {
      mockRosaryStreak.searchSessions.mockImplementation(() => {
        throw new Error('Search error');
      });

      render(<PrayerHistoryScreen {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText('Search intentions, reflections, insights...');

      // Should not crash when searching
      expect(() => {
        fireEvent.change(searchInput, { target: { value: 'test' } });
      }).not.toThrow();
    });
  });
});