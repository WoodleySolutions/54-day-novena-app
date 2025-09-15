import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { MoodType } from '../../types';

interface PrePrayerIntentionProps {
  onSubmit: (data: { intention?: string; mood?: MoodType }) => void;
  onSkip: () => void;
  initialIntention?: string;
  initialMood?: MoodType;
  showMoodSelector?: boolean;
}

const moodOptions: { value: MoodType; label: string; icon: string; color: string }[] = [
  { value: 'peaceful', label: 'Peaceful', icon: '😌', color: 'text-blue-500' },
  { value: 'joyful', label: 'Joyful', icon: '😊', color: 'text-yellow-500' },
  { value: 'hopeful', label: 'Hopeful', icon: '🌟', color: 'text-green-500' },
  { value: 'troubled', label: 'Troubled', icon: '😟', color: 'text-orange-500' },
  { value: 'sorrowful', label: 'Sorrowful', icon: '😢', color: 'text-purple-500' }
];

export const PrePrayerIntention: React.FC<PrePrayerIntentionProps> = ({
  onSubmit,
  onSkip,
  initialIntention = '',
  initialMood,
  showMoodSelector = true
}) => {
  const [intention, setIntention] = useState(initialIntention);
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(initialMood);

  const handleIntentionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setIntention(value);
    }
  };

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(selectedMood === mood ? undefined : mood);
  };

  const handleMoodKeyDown = (e: React.KeyboardEvent, mood: MoodType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleMoodSelect(mood);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      intention: intention.trim() || undefined,
      mood: selectedMood
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
            <Heart className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Set Your Intention
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          What would you like to pray for today? (Optional)
        </p>
      </div>

      <div className="space-y-4">
        {/* Intention Input */}
        <div>
          <label htmlFor="prayer-intention" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Prayer Intention
          </label>
          <textarea
            id="prayer-intention"
            value={intention}
            onChange={handleIntentionChange}
            placeholder="For healing, guidance, thanksgiving, family, peace..."
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            rows={3}
            maxLength={500}
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
            {intention.length}/500
          </div>
        </div>

        {/* Mood Selector */}
        {showMoodSelector && (
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              How are you feeling?
            </legend>
            <div className="grid grid-cols-3 gap-2" role="group" aria-labelledby="mood-selector">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => handleMoodSelect(mood.value)}
                  onKeyDown={(e) => handleMoodKeyDown(e, mood.value)}
                  aria-pressed={selectedMood === mood.value}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                    selectedMood === mood.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <span className="text-2xl mb-1">{mood.icon}</span>
                  <span className={`text-xs font-medium ${
                    selectedMood === mood.value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {mood.label}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={onSkip}
          className="flex-1 px-4 py-3 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Skip for now
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Begin Prayer
        </button>
      </div>

      {/* Helpful Tips */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          💡 <strong>Tip:</strong> Setting an intention helps focus your prayer and creates a meaningful record of your spiritual journey.
        </p>
      </div>
    </div>
  );
};