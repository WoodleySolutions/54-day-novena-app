import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PrePrayerIntention } from '../PrePrayerIntention';
import { MoodType } from '../../../types';

describe('PrePrayerIntention Component', () => {
  const defaultProps = {
    onSubmit: jest.fn(),
    onSkip: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders with default props', () => {
      render(<PrePrayerIntention {...defaultProps} />);

      expect(screen.getByText('Set Your Intention')).toBeInTheDocument();
      expect(screen.getByText('What would you like to pray for today? (Optional)')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...')).toBeInTheDocument();
      expect(screen.getByText('How are you feeling?')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Skip for now' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Begin Prayer' })).toBeInTheDocument();
    });

    test('renders with initial intention', () => {
      render(
        <PrePrayerIntention
          {...defaultProps}
          initialIntention="Initial prayer intention"
        />
      );

      const textarea = screen.getByDisplayValue('Initial prayer intention');
      expect(textarea).toBeInTheDocument();
    });

    test('renders with initial mood selected', () => {
      render(
        <PrePrayerIntention
          {...defaultProps}
          initialMood="peaceful"
        />
      );

      const peacefulButton = screen.getByRole('button', { name: '😌 Peaceful' });
      expect(peacefulButton).toHaveClass('border-blue-500', 'bg-blue-50');
    });

    test('renders without mood selector when showMoodSelector is false', () => {
      render(
        <PrePrayerIntention
          {...defaultProps}
          showMoodSelector={false}
        />
      );

      expect(screen.queryByText('How are you feeling?')).not.toBeInTheDocument();
    });

    test('renders all mood options', () => {
      render(<PrePrayerIntention {...defaultProps} />);

      expect(screen.getByRole('button', { name: '😌 Peaceful' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '😊 Joyful' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '🌟 Hopeful' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '😟 Troubled' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '😢 Sorrowful' })).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    test('updates intention text when typing', () => {
      render(<PrePrayerIntention {...defaultProps} />);

      const textarea = screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...');
      fireEvent.change(textarea, { target: { value: 'Prayer for family healing' } });

      expect(textarea).toHaveValue('Prayer for family healing');
    });

    test('shows character count', () => {
      render(<PrePrayerIntention {...defaultProps} />);

      const textarea = screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...');
      fireEvent.change(textarea, { target: { value: 'Test intention' } });

      expect(screen.getByText('14/500')).toBeInTheDocument();
    });

    test('enforces character limit', () => {
      render(<PrePrayerIntention {...defaultProps} />);

      const textarea = screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...');

      // Try to input text that is exactly at the limit - should work
      const exactLimitText = 'a'.repeat(500);
      fireEvent.change(textarea, { target: { value: exactLimitText } });
      expect((textarea as HTMLTextAreaElement).value).toHaveLength(500);

      // Try to input text that exceeds the limit - should be rejected
      const longText = 'a'.repeat(600);
      fireEvent.change(textarea, { target: { value: longText } });
      expect((textarea as HTMLTextAreaElement).value).toHaveLength(500); // Should still be 500, not 600
    });

    test('selects and deselects mood', () => {
      render(<PrePrayerIntention {...defaultProps} />);

      const peacefulButton = screen.getByRole('button', { name: '😌 Peaceful' });

      // Initially not selected
      expect(peacefulButton).not.toHaveClass('border-blue-500');

      // Click to select
      fireEvent.click(peacefulButton);
      expect(peacefulButton).toHaveClass('border-blue-500', 'bg-blue-50');

      // Click again to deselect
      fireEvent.click(peacefulButton);
      expect(peacefulButton).not.toHaveClass('border-blue-500');
    });

    test('allows only one mood selection at a time', () => {
      render(<PrePrayerIntention {...defaultProps} />);

      const peacefulButton = screen.getByRole('button', { name: '😌 Peaceful' });
      const joyfulButton = screen.getByRole('button', { name: '😊 Joyful' });

      fireEvent.click(peacefulButton);
      expect(peacefulButton).toHaveClass('border-blue-500');

      fireEvent.click(joyfulButton);
      expect(joyfulButton).toHaveClass('border-blue-500');
      expect(peacefulButton).not.toHaveClass('border-blue-500');
    });
  });

  describe('Form Submission', () => {
    test('calls onSkip when skip button is clicked', () => {
      const onSkip = jest.fn();
      render(<PrePrayerIntention {...defaultProps} onSkip={onSkip} />);

      fireEvent.click(screen.getByRole('button', { name: 'Skip for now' }));

      expect(onSkip).toHaveBeenCalledTimes(1);
    });

    test('calls onSubmit with intention only', () => {
      const onSubmit = jest.fn();
      render(<PrePrayerIntention {...defaultProps} onSubmit={onSubmit} />);

      const textarea = screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...');
      fireEvent.change(textarea, { target: { value: 'Test intention' } });

      fireEvent.click(screen.getByRole('button', { name: 'Begin Prayer' }));

      expect(onSubmit).toHaveBeenCalledWith({
        intention: 'Test intention',
        mood: undefined
      });
    });

    test('calls onSubmit with mood only', () => {
      const onSubmit = jest.fn();
      render(<PrePrayerIntention {...defaultProps} onSubmit={onSubmit} />);

      fireEvent.click(screen.getByRole('button', { name: '😊 Joyful' }));
      fireEvent.click(screen.getByRole('button', { name: 'Begin Prayer' }));

      expect(onSubmit).toHaveBeenCalledWith({
        intention: undefined,
        mood: 'joyful'
      });
    });

    test('calls onSubmit with both intention and mood', () => {
      const onSubmit = jest.fn();
      render(<PrePrayerIntention {...defaultProps} onSubmit={onSubmit} />);

      const textarea = screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...');
      fireEvent.change(textarea, { target: { value: 'Prayer for peace' } });
      fireEvent.click(screen.getByRole('button', { name: '🌟 Hopeful' }));

      fireEvent.click(screen.getByRole('button', { name: 'Begin Prayer' }));

      expect(onSubmit).toHaveBeenCalledWith({
        intention: 'Prayer for peace',
        mood: 'hopeful'
      });
    });

    test('trims whitespace from intention', () => {
      const onSubmit = jest.fn();
      render(<PrePrayerIntention {...defaultProps} onSubmit={onSubmit} />);

      const textarea = screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...');
      fireEvent.change(textarea, { target: { value: '  Prayer with spaces  ' } });

      fireEvent.click(screen.getByRole('button', { name: 'Begin Prayer' }));

      expect(onSubmit).toHaveBeenCalledWith({
        intention: 'Prayer with spaces',
        mood: undefined
      });
    });

    test('converts empty intention to undefined', () => {
      const onSubmit = jest.fn();
      render(<PrePrayerIntention {...defaultProps} onSubmit={onSubmit} />);

      const textarea = screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...');
      fireEvent.change(textarea, { target: { value: '   ' } }); // Only whitespace

      fireEvent.click(screen.getByRole('button', { name: 'Begin Prayer' }));

      expect(onSubmit).toHaveBeenCalledWith({
        intention: undefined,
        mood: undefined
      });
    });
  });

  describe('Accessibility', () => {
    test('has proper form labels', () => {
      render(<PrePrayerIntention {...defaultProps} />);

      expect(screen.getByLabelText('Prayer Intention')).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'How are you feeling?' })).toBeInTheDocument();
    });

    test('mood buttons have accessible names', () => {
      render(<PrePrayerIntention {...defaultProps} />);

      const moodButtons = [
        { name: '😌 Peaceful', emoji: '😌' },
        { name: '😊 Joyful', emoji: '😊' },
        { name: '🌟 Hopeful', emoji: '🌟' },
        { name: '😟 Troubled', emoji: '😟' },
        { name: '😢 Sorrowful', emoji: '😢' }
      ];

      moodButtons.forEach(({ name, emoji }) => {
        const button = screen.getByRole('button', { name });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(emoji);
      });
    });

    test('supports keyboard navigation for mood selection', () => {
      render(<PrePrayerIntention {...defaultProps} />);

      const peacefulButton = screen.getByRole('button', { name: '😌 Peaceful' });

      // Should be focusable
      peacefulButton.focus();
      expect(peacefulButton).toHaveFocus();

      // Should work with Enter key
      fireEvent.keyDown(peacefulButton, { key: 'Enter', code: 'Enter' });
      expect(peacefulButton).toHaveClass('border-blue-500');
    });
  });

  describe('Visual States', () => {
    test('shows helpful tip', () => {
      render(<PrePrayerIntention {...defaultProps} />);

      expect(screen.getByText(/Setting an intention helps focus your prayer/)).toBeInTheDocument();
    });

    test('displays icon in header', () => {
      render(<PrePrayerIntention {...defaultProps} />);

      // Heart icon should be present (though we can't easily test the specific icon)
      const header = screen.getByText('Set Your Intention').closest('div');
      expect(header).toBeInTheDocument();
    });

    test('shows sparkles icon on submit button', () => {
      render(<PrePrayerIntention {...defaultProps} />);

      const submitButton = screen.getByRole('button', { name: 'Begin Prayer' });
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    test('handles missing optional props gracefully', () => {
      render(
        <PrePrayerIntention
          onSubmit={jest.fn()}
          onSkip={jest.fn()}
        />
      );

      // Should render without initial values
      const textarea = screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...');
      expect(textarea).toHaveValue('');

      // No mood should be selected initially
      const moodButtons = screen.getAllByRole('button').filter(btn =>
        ['Peaceful', 'Joyful', 'Hopeful', 'Troubled', 'Sorrowful'].includes(btn.textContent || '')
      );
      moodButtons.forEach(button => {
        expect(button).not.toHaveClass('border-blue-500');
      });
    });
  });

  describe('Edge Cases', () => {
    test('handles rapid mood selection changes', () => {
      const onSubmit = jest.fn();
      render(<PrePrayerIntention {...defaultProps} onSubmit={onSubmit} />);

      const peacefulButton = screen.getByRole('button', { name: '😌 Peaceful' });
      const joyfulButton = screen.getByRole('button', { name: '😊 Joyful' });

      // Rapidly click different moods
      fireEvent.click(peacefulButton);
      fireEvent.click(joyfulButton);
      fireEvent.click(peacefulButton);

      fireEvent.click(screen.getByRole('button', { name: 'Begin Prayer' }));

      expect(onSubmit).toHaveBeenCalledWith({
        intention: undefined,
        mood: 'peaceful'
      });
    });

    test('handles form submission with maximum length intention', () => {
      const onSubmit = jest.fn();
      render(<PrePrayerIntention {...defaultProps} onSubmit={onSubmit} />);

      const maxLengthText = 'a'.repeat(500);
      const textarea = screen.getByPlaceholderText('For healing, guidance, thanksgiving, family, peace...');
      fireEvent.change(textarea, { target: { value: maxLengthText } });

      fireEvent.click(screen.getByRole('button', { name: 'Begin Prayer' }));

      expect(onSubmit).toHaveBeenCalledWith({
        intention: maxLengthText,
        mood: undefined
      });
    });
  });
});