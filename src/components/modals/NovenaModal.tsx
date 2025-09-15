import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Calendar, Clock, Heart } from 'lucide-react';
import { NovenaType, MoodType } from '../../types';
import { NOVENA_INFO, NOVENA_PRAYERS } from '../../constants/novenas';
import { ExpandablePrayer } from '../common/ExpandablePrayer';
import {
  requestWakeLock,
  releaseWakeLock,
  getKeepScreenAwakePreference
} from '../../utils/screenWakeLock';
import { audioFeedback, useAudioPreference } from '../../utils/audioFeedback';
import { PrePrayerIntention } from '../journal/PrePrayerIntention';
import { PostPrayerReflection } from '../journal/PostPrayerReflection';

interface NovenaModalProps {
  isOpen: boolean;
  novenaType: NovenaType;
  novenaId: string;
  currentDay: number;
  existingIntention?: string;
  onClose: () => void;
  onComplete: (journalData?: {
    intention?: string;
    reflection?: string;
    mood?: MoodType;
    gratitudes?: string[];
    insights?: string;
    tags?: string[];
  }) => void;
}

interface NovenaStep {
  id: string;
  title: string;
  content: string | string[];
  type: 'prayer' | 'instruction' | 'intention' | 'reflection' | 'scripture';
}

export const NovenaModal: React.FC<NovenaModalProps> = ({
  isOpen,
  novenaType,
  novenaId,
  currentDay,
  existingIntention,
  onClose,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showIntention, setShowIntention] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [intention, setIntention] = useState(existingIntention || '');
  const [reflection, setReflection] = useState('');
  const [mood, setMood] = useState<MoodType | undefined>();
  const [gratitudes, setGratitudes] = useState<string[]>([]);
  const [insights, setInsights] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [wakeLock, setWakeLock] = useState<any>(null);

  const playAudio = useAudioPreference();
  const novenaInfo = NOVENA_INFO[novenaType];
  const novenaDay = NOVENA_PRAYERS[novenaType]?.find(day => day.day === currentDay);

  useEffect(() => {
    if (isOpen && getKeepScreenAwakePreference()) {
      requestWakeLock().then((lock) => setWakeLock(lock));
    }

    return () => {
      if (wakeLock) {
        releaseWakeLock();
      }
    };
  }, [isOpen, wakeLock]);

  if (!isOpen || !novenaDay) return null;

  // Create prayer steps
  const createSteps = (): NovenaStep[] => {
    const steps: NovenaStep[] = [];

    // Intention step - only on day 1 if no intention exists yet
    if (currentDay === 1 && !existingIntention && !intention) {
      steps.push({
        id: 'intention',
        title: 'Set Your Intention',
        content: [`Day ${currentDay} of 9`, novenaDay.title],
        type: 'intention'
      });
    }

    // Opening prayer
    steps.push({
      id: 'opening',
      title: 'Opening Prayer',
      content: [
        'In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.',
        '',
        'Heavenly Father, we come before You in faith and humility, seeking Your grace and blessing as we begin this novena prayer.'
      ],
      type: 'prayer'
    });

    // Scripture reading (if available)
    if (novenaDay.scripture) {
      steps.push({
        id: 'scripture',
        title: 'Scripture Reading',
        content: [novenaDay.scripture],
        type: 'scripture'
      });
    }

    // Main novena content
    steps.push({
      id: 'main-prayer',
      title: novenaDay.title,
      content: Array.isArray(novenaDay.content) ? novenaDay.content : [novenaDay.content],
      type: 'prayer'
    });

    // Specific day prayer (if available)
    if (novenaDay.prayer) {
      steps.push({
        id: 'day-prayer',
        title: `Day ${currentDay} Prayer`,
        content: [novenaDay.prayer],
        type: 'prayer'
      });
    }

    // Closing prayer
    steps.push({
      id: 'closing',
      title: 'Closing Prayer',
      content: [
        'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.',
        '',
        `${novenaInfo.patron || 'Holy Saint'}, pray for us.`
      ],
      type: 'prayer'
    });

    // Reflection step
    steps.push({
      id: 'reflection',
      title: 'Reflection',
      content: [
        'Take a moment to reflect on your prayer experience.',
        novenaDay.reflection || 'How did this prayer speak to your heart today?'
      ],
      type: 'reflection'
    });

    return steps;
  };

  const steps = createSteps();

  const handleNext = () => {
    if (playAudio) {
      audioFeedback.stepAdvance();
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (playAudio) {
      audioFeedback.stepAdvance();
    }

    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (playAudio) {
      audioFeedback.prayerComplete();
    }

    if (wakeLock) {
      releaseWakeLock();
      setWakeLock(null);
    }

    onComplete({
      intention: intention || existingIntention || '', // Use current intention or existing one
      reflection,
      mood,
      gratitudes,
      insights,
      tags
    });
  };

  const handleClose = () => {
    if (wakeLock) {
      releaseWakeLock();
      setWakeLock(null);
    }
    onClose();
  };

  const handleStartPrayer = () => {
    setHasStarted(true);
    // Only show intention modal on day 1 if no intention exists (check both existing and current)
    if (currentDay === 1 && !existingIntention && !intention) {
      setShowIntention(true);
    } else {
      // Skip to first prayer step (index 0 now since no intention step)
      setCurrentStep(0);
    }
  };

  const handleIntentionComplete = (intentionData: { intention: string }) => {
    setIntention(intentionData.intention);
    setShowIntention(false);
    // After setting intention, the steps array will be recreated without the intention step
    // So we start from step 0 (which will now be the opening prayer)
    setCurrentStep(0);
  };

  const handleReflectionComplete = (reflectionData: {
    reflection?: string;
    mood?: MoodType;
    gratitudes?: string[];
    insights?: string;
    tags?: string[];
  }) => {
    setReflection(reflectionData.reflection || '');
    setMood(reflectionData.mood);
    setGratitudes(reflectionData.gratitudes || []);
    setInsights(reflectionData.insights || '');
    setTags(reflectionData.tags || []);
    setShowReflection(false);
    handleComplete();
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col transition-colors duration-300">

        {/* Header */}
        <div
          className="relative text-white p-6 flex-shrink-0"
          style={{ backgroundColor: novenaInfo.color }}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl">
              {novenaInfo.icon}
            </div>
            <h2 className="text-2xl font-bold mb-2">{novenaInfo.name}</h2>
            <div className="flex items-center justify-center space-x-4 text-sm opacity-90">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Day {currentDay} of 9</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>~{novenaInfo.estimatedDuration} min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content - Scrollable area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {!hasStarted ? (
            /* Pre-Prayer Screen */
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {novenaDay.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Ready to begin Day {currentDay} of your {novenaInfo.name}?
              </p>

              {intention && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Your Intention</h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm italic">"{intention}"</p>
                </div>
              )}

              <button
                onClick={handleStartPrayer}
                className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                style={{ backgroundColor: novenaInfo.color }}
              >
                <Heart className="w-5 h-5" />
                <span>Begin Prayer</span>
              </button>
            </div>
          ) : (
            /* Prayer Steps - Flexible layout */
            <div className="flex flex-col h-full">
              {/* Progress indicator */}
              <div className="flex-shrink-0 p-6 pb-0">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentStep + 1) / steps.length) * 100}%`,
                        backgroundColor: novenaInfo.color
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Current step content - Scrollable */}
              <div className="flex-1 px-6 pb-4 overflow-y-auto min-h-0">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  {currentStepData.title}
                </h3>

                {currentStepData.type === 'intention' ? (
                  <div className="text-center py-4">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Set your heart's intention for this novena day.
                    </p>
                  </div>
                ) : currentStepData.type === 'reflection' ? (
                  <div className="text-center py-4">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Reflect on how this prayer touched your heart.
                    </p>
                  </div>
                ) : (
                  <ExpandablePrayer
                    prayerName={currentStepData.title}
                    prayerText={Array.isArray(currentStepData.content) ? currentStepData.content.join('\n\n') : currentStepData.content}
                    disableScroll={true}
                  />
                )}
              </div>

              {/* Navigation buttons - Fixed at bottom */}
              <div className="flex-shrink-0 p-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex justify-between">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={() => {
                      if (currentStepData.type === 'intention') {
                        setShowIntention(true);
                      } else if (currentStepData.type === 'reflection') {
                        setShowReflection(true);
                      } else {
                        handleNext();
                      }
                    }}
                    className="flex items-center space-x-2 px-6 py-2 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md"
                    style={{ backgroundColor: novenaInfo.color }}
                  >
                    <span>
                      {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pre-Prayer Intention Modal */}
      {showIntention && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto p-6">
            <PrePrayerIntention
              onSubmit={(data) => {
                handleIntentionComplete({ intention: data.intention || '' });
              }}
              onSkip={() => {
                handleIntentionComplete({ intention: '' });
              }}
              initialIntention={intention}
            />
          </div>
        </div>
      )}

      {/* Post-Prayer Reflection Modal */}
      {showReflection && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto p-6">
            <PostPrayerReflection
              onSubmit={handleReflectionComplete}
              onSkip={() => {
                handleReflectionComplete({});
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};