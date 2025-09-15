import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PostPrayerReflection } from '../PostPrayerReflection';
import { MoodType } from '../../../types';

describe('PostPrayerReflection Component', () => {
  const defaultProps = {
    onSubmit: jest.fn(),
    onSkip: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders with default props', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      expect(screen.getByText('Prayer Reflection')).toBeInTheDocument();
      expect(screen.getByText('How was your prayer time? Capture your thoughts and feelings.')).toBeInTheDocument();
      expect(screen.getByLabelText('Overall Reflection')).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'How do you feel after praying?' })).toBeInTheDocument();
      expect(screen.getByText(/What are you grateful for/)).toBeInTheDocument();
      expect(screen.getByLabelText('Spiritual Insights')).toBeInTheDocument();
      expect(screen.getByText(/Tags/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Skip reflection' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Complete Prayer' })).toBeInTheDocument();
    });

    test('renders with initial data', () => {
      const initialData = {
        reflection: 'Initial reflection',
        mood: 'peaceful' as MoodType,
        gratitudes: ['Health', 'Family'],
        insights: 'God is good',
        tags: ['healing', 'peace']
      };

      render(
        <PostPrayerReflection
          {...defaultProps}
          initialData={initialData}
        />
      );

      expect(screen.getByDisplayValue('Initial reflection')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '😌 Peaceful' })).toHaveClass('border-green-500');
      expect(screen.getByText('Health')).toBeInTheDocument();
      expect(screen.getByText('Family')).toBeInTheDocument();
      expect(screen.getByDisplayValue('God is good')).toBeInTheDocument();
      expect(screen.getByText('#healing')).toBeInTheDocument();
      expect(screen.getByText('#peace')).toBeInTheDocument();
    });

    test('shows Save Reflection button when content is present', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const textarea = screen.getByLabelText('Overall Reflection');
      fireEvent.change(textarea, { target: { value: 'Test reflection' } });

      expect(screen.getByRole('button', { name: 'Save Reflection' })).toBeInTheDocument();
    });
  });

  describe('Reflection Input', () => {
    test('updates reflection text when typing', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const textarea = screen.getByLabelText('Overall Reflection');
      fireEvent.change(textarea, { target: { value: 'My prayer reflection' } });

      expect(textarea).toHaveValue('My prayer reflection');
    });

    test('shows character count for reflection', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const textarea = screen.getByLabelText('Overall Reflection');
      fireEvent.change(textarea, { target: { value: 'Test reflection' } });

      expect(screen.getByText('15/1000')).toBeInTheDocument();
    });

    test('enforces character limit for reflection', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const textarea = screen.getByLabelText('Overall Reflection');
      const longText = 'a'.repeat(1200);
      fireEvent.change(textarea, { target: { value: longText } });

      expect((textarea as HTMLTextAreaElement).value).toHaveLength(1000);
    });
  });

  describe('Mood Selection', () => {
    test('selects and deselects mood', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const joyfulButton = screen.getByRole('button', { name: 'Joyful' });

      expect(joyfulButton).not.toHaveClass('border-green-500');

      fireEvent.click(joyfulButton);
      expect(joyfulButton).toHaveClass('border-green-500', 'bg-green-50');

      fireEvent.click(joyfulButton);
      expect(joyfulButton).not.toHaveClass('border-green-500');
    });

    test('allows only one mood selection at a time', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const joyfulButton = screen.getByRole('button', { name: 'Joyful' });
      const peacefulButton = screen.getByRole('button', { name: 'Peaceful' });

      fireEvent.click(joyfulButton);
      expect(joyfulButton).toHaveClass('border-green-500');

      fireEvent.click(peacefulButton);
      expect(peacefulButton).toHaveClass('border-green-500');
      expect(joyfulButton).not.toHaveClass('border-green-500');
    });
  });

  describe('Gratitudes Management', () => {
    test('adds gratitude item', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const input = screen.getByPlaceholderText('Add something you\'re thankful for...');
      fireEvent.change(input, { target: { value: 'Good health' } });
      fireEvent.click(screen.getByRole('button', { name: '+' }));

      expect(screen.getByText('Good health')).toBeInTheDocument();
      expect(input).toHaveValue('');
    });

    test('adds gratitude on Enter key', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const input = screen.getByPlaceholderText('Add something you\'re thankful for...');
      fireEvent.change(input, { target: { value: 'Family love' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });

      expect(screen.getByText('Family love')).toBeInTheDocument();
    });

    test('removes gratitude item', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const input = screen.getByPlaceholderText('Add something you\'re thankful for...');
      fireEvent.change(input, { target: { value: 'Test gratitude' } });
      fireEvent.click(screen.getByRole('button', { name: '+' }));

      expect(screen.getByText('Test gratitude')).toBeInTheDocument();

      const removeButton = screen.getByRole('button', { name: '×' });
      fireEvent.click(removeButton);

      expect(screen.queryByText('Test gratitude')).not.toBeInTheDocument();
    });

    test('limits gratitudes to 5 items', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const input = screen.getByPlaceholderText('Add something you\'re thankful for...');

      // Add 5 gratitudes
      for (let i = 1; i <= 5; i++) {
        fireEvent.change(input, { target: { value: `Gratitude ${i}` } });
        fireEvent.click(screen.getByRole('button', { name: '+' }));
      }

      expect(screen.getByText('(5/5)')).toBeInTheDocument();

      // Try to add a 6th
      fireEvent.change(input, { target: { value: 'Sixth gratitude' } });
      const addButton = screen.getByRole('button', { name: '+' });
      expect(addButton).toBeDisabled();
    });

    test('prevents adding empty gratitudes', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const addButton = screen.getByRole('button', { name: '+' });
      expect(addButton).toBeDisabled();

      const input = screen.getByPlaceholderText('Add something you\'re thankful for...');
      fireEvent.change(input, { target: { value: '   ' } }); // Only whitespace

      expect(addButton).toBeDisabled();
    });

    test('trims whitespace from gratitudes', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const input = screen.getByPlaceholderText('Add something you\'re thankful for...');
      fireEvent.change(input, { target: { value: '  Health  ' } });
      fireEvent.click(screen.getByRole('button', { name: '+' }));

      expect(screen.getByText('Health')).toBeInTheDocument();
    });
  });

  describe('Insights Input', () => {
    test('updates insights text when typing', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const textarea = screen.getByLabelText('Spiritual Insights');
      fireEvent.change(textarea, { target: { value: 'God spoke to my heart' } });

      expect(textarea).toHaveValue('God spoke to my heart');
    });

    test('shows character count for insights', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const textarea = screen.getByLabelText('Spiritual Insights');
      fireEvent.change(textarea, { target: { value: 'Test insight' } });

      expect(screen.getByText('12/500')).toBeInTheDocument();
    });

    test('enforces character limit for insights', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const textarea = screen.getByLabelText('Spiritual Insights');
      const longText = 'a'.repeat(600);
      fireEvent.change(textarea, { target: { value: longText } });

      expect((textarea as HTMLTextAreaElement).value).toHaveLength(500);
    });
  });

  describe('Tags Management', () => {
    test('adds tag', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const input = screen.getByPlaceholderText('Add tags like \'healing\', \'family\', \'peace\'...');
      fireEvent.change(input, { target: { value: 'healing' } });
      fireEvent.click(screen.getAllByRole('button', { name: '+' })[1]); // Second + button (for tags)

      expect(screen.getByText('#healing')).toBeInTheDocument();
    });

    test('adds tag on Enter key', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const input = screen.getByPlaceholderText('Add tags like \'healing\', \'family\', \'peace\'...');
      fireEvent.change(input, { target: { value: 'peace' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });

      expect(screen.getByText('#peace')).toBeInTheDocument();
    });

    test('converts tags to lowercase', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const input = screen.getByPlaceholderText('Add tags like \'healing\', \'family\', \'peace\'...');
      fireEvent.change(input, { target: { value: 'HEALING' } });
      fireEvent.click(screen.getAllByRole('button', { name: '+' })[1]);

      expect(screen.getByText('#healing')).toBeInTheDocument();
    });

    test('prevents duplicate tags', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const input = screen.getByPlaceholderText('Add tags like \'healing\', \'family\', \'peace\'...');

      // Add first tag
      fireEvent.change(input, { target: { value: 'healing' } });
      fireEvent.click(screen.getAllByRole('button', { name: '+' })[1]);

      expect(screen.getByText('#healing')).toBeInTheDocument();

      // Try to add duplicate
      fireEvent.change(input, { target: { value: 'healing' } });
      const addButton = screen.getAllByRole('button', { name: '+' })[1];
      expect(addButton).toBeDisabled();
    });

    test('limits tags to 5 items', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const input = screen.getByPlaceholderText('Add tags like \'healing\', \'family\', \'peace\'...');

      // Add 5 tags
      for (let i = 1; i <= 5; i++) {
        fireEvent.change(input, { target: { value: `tag${i}` } });
        fireEvent.click(screen.getAllByRole('button', { name: '+' })[1]);
      }

      expect(screen.getByText('(5/5)')).toBeInTheDocument();

      // Try to add a 6th
      fireEvent.change(input, { target: { value: 'tag6' } });
      const addButton = screen.getAllByRole('button', { name: '+' })[1];
      expect(addButton).toBeDisabled();
    });

    test('removes tag', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const input = screen.getByPlaceholderText('Add tags like \'healing\', \'family\', \'peace\'...');
      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent.click(screen.getAllByRole('button', { name: '+' })[1]);

      expect(screen.getByText('#test')).toBeInTheDocument();

      // Find the remove button for the tag (last × button)
      const removeButtons = screen.getAllByRole('button', { name: '×' });
      const tagRemoveButton = removeButtons[removeButtons.length - 1];
      fireEvent.click(tagRemoveButton);

      expect(screen.queryByText('#test')).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    test('calls onSkip when skip button is clicked', () => {
      const onSkip = jest.fn();
      render(<PostPrayerReflection {...defaultProps} onSkip={onSkip} />);

      fireEvent.click(screen.getByRole('button', { name: 'Skip reflection' }));

      expect(onSkip).toHaveBeenCalledTimes(1);
    });

    test('calls onSubmit with complete data', () => {
      const onSubmit = jest.fn();
      render(<PostPrayerReflection {...defaultProps} onSubmit={onSubmit} />);

      // Fill in all fields
      const reflectionTextarea = screen.getByLabelText('Overall Reflection');
      fireEvent.change(reflectionTextarea, { target: { value: 'Great prayer time' } });

      fireEvent.click(screen.getByRole('button', { name: 'Joyful' }));

      const gratitudeInput = screen.getByPlaceholderText('Add something you\'re thankful for...');
      fireEvent.change(gratitudeInput, { target: { value: 'Health' } });
      fireEvent.click(screen.getByRole('button', { name: '+' }));

      const insightsTextarea = screen.getByLabelText('Spiritual Insights');
      fireEvent.change(insightsTextarea, { target: { value: 'God is present' } });

      const tagInput = screen.getByPlaceholderText('Add tags like \'healing\', \'family\', \'peace\'...');
      fireEvent.change(tagInput, { target: { value: 'blessing' } });
      fireEvent.click(screen.getAllByRole('button', { name: '+' })[1]);

      fireEvent.click(screen.getByRole('button', { name: 'Save Reflection' }));

      expect(onSubmit).toHaveBeenCalledWith({
        reflection: 'Great prayer time',
        mood: 'joyful',
        gratitudes: ['Health'],
        insights: 'God is present',
        tags: ['blessing']
      });
    });

    test('calls onSubmit with partial data', () => {
      const onSubmit = jest.fn();
      render(<PostPrayerReflection {...defaultProps} onSubmit={onSubmit} />);

      const reflectionTextarea = screen.getByLabelText('Overall Reflection');
      fireEvent.change(reflectionTextarea, { target: { value: 'Simple reflection' } });

      fireEvent.click(screen.getByRole('button', { name: 'Save Reflection' }));

      expect(onSubmit).toHaveBeenCalledWith({
        reflection: 'Simple reflection',
        mood: undefined,
        gratitudes: undefined,
        insights: undefined,
        tags: undefined
      });
    });

    test('calls onSubmit with empty data', () => {
      const onSubmit = jest.fn();
      render(<PostPrayerReflection {...defaultProps} onSubmit={onSubmit} />);

      fireEvent.click(screen.getByRole('button', { name: 'Complete Prayer' }));

      expect(onSubmit).toHaveBeenCalledWith({
        reflection: undefined,
        mood: undefined,
        gratitudes: undefined,
        insights: undefined,
        tags: undefined
      });
    });

    test('trims whitespace from text fields', () => {
      const onSubmit = jest.fn();
      render(<PostPrayerReflection {...defaultProps} onSubmit={onSubmit} />);

      const reflectionTextarea = screen.getByLabelText('Overall Reflection');
      fireEvent.change(reflectionTextarea, { target: { value: '  Reflection with spaces  ' } });

      const insightsTextarea = screen.getByLabelText('Spiritual Insights');
      fireEvent.change(insightsTextarea, { target: { value: '  Insight with spaces  ' } });

      fireEvent.click(screen.getByRole('button', { name: 'Save Reflection' }));

      expect(onSubmit).toHaveBeenCalledWith({
        reflection: 'Reflection with spaces',
        mood: undefined,
        gratitudes: undefined,
        insights: 'Insight with spaces',
        tags: undefined
      });
    });
  });

  describe('Character Limits', () => {
    test('enforces 100 character limit for gratitude items', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const input = screen.getByPlaceholderText('Add something you\'re thankful for...');
      const longText = 'a'.repeat(150);
      fireEvent.change(input, { target: { value: longText } });

      expect((input as HTMLInputElement).value).toHaveLength(100);
    });

    test('enforces 30 character limit for tags', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const input = screen.getByPlaceholderText('Add tags like \'healing\', \'family\', \'peace\'...');
      const longText = 'a'.repeat(50);
      fireEvent.change(input, { target: { value: longText } });

      expect((input as HTMLInputElement).value).toHaveLength(30);
    });
  });

  describe('Visual Elements', () => {
    test('shows helpful tip', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      expect(screen.getByText(/Regular reflection helps you track your spiritual growth/)).toBeInTheDocument();
    });

    test('has proper icons for each section', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      // Check that sections are present (icons are harder to test directly)
      expect(screen.getByText('Spiritual Insights')).toBeInTheDocument();
    });

    test('displays component in scrollable container for long content', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const container = screen.getByText('Prayer Reflection').closest('div');
      expect(container).toHaveClass('max-h-[80vh]', 'overflow-y-auto');
    });
  });

  describe('Accessibility', () => {
    test('has proper form labels', () => {
      render(<PostPrayerReflection {...defaultProps} />);

      expect(screen.getByLabelText('Overall Reflection')).toBeInTheDocument();
      expect(screen.getByLabelText('How do you feel after praying?')).toBeInTheDocument();
      expect(screen.getByLabelText(/What are you grateful for/)).toBeInTheDocument();
      expect(screen.getByLabelText('Spiritual Insights')).toBeInTheDocument();
      expect(screen.getByLabelText(/Tags/)).toBeInTheDocument();
    });

    test('maintains focus management for dynamic content', async () => {
      render(<PostPrayerReflection {...defaultProps} />);

      const gratitudeInput = screen.getByPlaceholderText('Add something you\'re thankful for...');
      fireEvent.change(gratitudeInput, { target: { value: 'Test' } });
      fireEvent.click(screen.getByRole('button', { name: '+' }));

      // Input should be cleared and ready for next entry
      await waitFor(() => {
        expect(gratitudeInput).toHaveValue('');
      });
    });
  });
});