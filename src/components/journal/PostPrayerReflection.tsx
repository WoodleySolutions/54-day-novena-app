import React, { useState } from 'react';
import { Lightbulb, Heart, Plus, X, BookOpen } from 'lucide-react';
import { MoodType } from '../../types';

interface PostPrayerReflectionProps {
  onSubmit: (data: {
    reflection?: string;
    mood?: MoodType;
    gratitudes?: string[];
    insights?: string;
    tags?: string[];
  }) => void;
  onSkip: () => void;
  initialData?: {
    reflection?: string;
    mood?: MoodType;
    gratitudes?: string[];
    insights?: string;
    tags?: string[];
  };
}

const moodOptions: { value: MoodType; label: string; icon: string; color: string }[] = [
  { value: 'peaceful', label: 'Peaceful', icon: '😌', color: 'text-blue-500' },
  { value: 'joyful', label: 'Joyful', icon: '😊', color: 'text-yellow-500' },
  { value: 'hopeful', label: 'Hopeful', icon: '🌟', color: 'text-green-500' },
  { value: 'troubled', label: 'Troubled', icon: '😟', color: 'text-orange-500' },
  { value: 'sorrowful', label: 'Sorrowful', icon: '😢', color: 'text-purple-500' }
];

export const PostPrayerReflection: React.FC<PostPrayerReflectionProps> = ({
  onSubmit,
  onSkip,
  initialData = {}
}) => {
  const [reflection, setReflection] = useState(initialData.reflection || '');
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(initialData.mood);
  const [gratitudes, setGratitudes] = useState<string[]>(initialData.gratitudes || []);
  const [insights, setInsights] = useState(initialData.insights || '');
  const [tags, setTags] = useState<string[]>(initialData.tags || []);
  const [newGratitude, setNewGratitude] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleReflectionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setReflection(value);
    }
  };

  const handleInsightsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setInsights(value);
    }
  };

  const handleGratitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setNewGratitude(value);
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setNewTag(value);
    }
  };

  const addGratitude = () => {
    if (newGratitude.trim() && gratitudes.length < 5) {
      setGratitudes([...gratitudes, newGratitude.trim()]);
      setNewGratitude('');
    }
  };

  const removeGratitude = (index: number) => {
    setGratitudes(gratitudes.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag.trim() && tags.length < 5 && !tags.includes(newTag.trim().toLowerCase())) {
      setTags([...tags, newTag.trim().toLowerCase()]);
      setNewTag('');
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

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSubmit({
      reflection: reflection.trim() || undefined,
      mood: selectedMood,
      gratitudes: gratitudes.length > 0 ? gratitudes : undefined,
      insights: insights.trim() || undefined,
      tags: tags.length > 0 ? tags : undefined
    });
  };

  const hasContent = reflection.trim() || selectedMood || gratitudes.length > 0 || insights.trim() || tags.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300 max-h-[80vh] overflow-y-auto">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-full">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Prayer Reflection
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          How was your prayer time? Capture your thoughts and feelings.
        </p>
      </div>

      <div className="space-y-5">
        {/* Main Reflection */}
        <div>
          <label htmlFor="reflection-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Overall Reflection
          </label>
          <textarea
            id="reflection-text"
            value={reflection}
            onChange={handleReflectionChange}
            placeholder="How did the prayer feel? What came to mind? Any particular thoughts or feelings?"
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            rows={4}
            maxLength={1000}
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
            {reflection.length}/1000
          </div>
        </div>

        {/* Mood After Prayer */}
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            How do you feel after praying?
          </legend>
          <div className="grid grid-cols-3 gap-2" role="group" aria-labelledby="post-mood-selector">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => handleMoodSelect(mood.value)}
                onKeyDown={(e) => handleMoodKeyDown(e, mood.value)}
                aria-pressed={selectedMood === mood.value}
                className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedMood === mood.value
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <span className="text-2xl mb-1">{mood.icon}</span>
                <span className={`text-xs font-medium ${
                  selectedMood === mood.value ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* Gratitudes */}
        <div>
          <label htmlFor="gratitude-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            What are you grateful for? ({gratitudes.length}/5)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              id="gratitude-input"
              type="text"
              value={newGratitude}
              onChange={handleGratitudeChange}
              onKeyPress={(e) => e.key === 'Enter' && addGratitude()}
              placeholder="Add something you're thankful for..."
              className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              maxLength={100}
              disabled={gratitudes.length >= 5}
            />
            <button
              onClick={addGratitude}
              disabled={!newGratitude.trim() || gratitudes.length >= 5}
              className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Add gratitude"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {gratitudes.map((gratitude, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm"
              >
                <span>{gratitude}</span>
                <button
                  onClick={() => removeGratitude(index)}
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div>
          <label htmlFor="insights-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Spiritual Insights
          </label>
          <textarea
            id="insights-text"
            value={insights}
            onChange={handleInsightsChange}
            placeholder="Any spiritual insights, inspirations, or messages you received?"
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            rows={3}
            maxLength={500}
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
            {insights.length}/500
          </div>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tag-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags ({tags.length}/5)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              id="tag-input"
              type="text"
              value={newTag}
              onChange={handleTagChange}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              placeholder="Add tags like 'healing', 'family', 'peace'..."
              className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              maxLength={30}
              disabled={tags.length >= 5}
            />
            <button
              onClick={addTag}
              disabled={!newTag.trim() || tags.length >= 5 || tags.includes(newTag.trim().toLowerCase())}
              className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Add tag"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-sm"
              >
                <span>#{tag}</span>
                <button
                  onClick={() => removeTag(index)}
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={onSkip}
          className="flex-1 px-4 py-3 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Skip reflection
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 font-medium flex items-center justify-center gap-2"
        >
          <Heart className="w-4 h-4" />
          {hasContent ? 'Save Reflection' : 'Complete Prayer'}
        </button>
      </div>

      {/* Helpful Tips */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          💡 <strong>Tip:</strong> Regular reflection helps you track your spiritual growth and see God's work in your life over time.
        </p>
      </div>
    </div>
  );
};