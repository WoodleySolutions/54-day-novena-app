import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { MysteryType, ChapletType, NovenaPhase, PrayerType } from '../../types';
import { getOpeningPrayer, getClosingPrayer, getDecadePrayers } from '../../utils/prayers';
import { ROSARY_MYSTERIES, MYSTERY_REFLECTIONS } from '../../constants/novena';
import { CHAPLET_INFO, CHAPLET_PRAYERS } from '../../constants/chaplets';
import { ExpandablePrayer } from '../common/ExpandablePrayer';
import { getPrayerText } from '../../constants/commonPrayers';
import { 
  requestWakeLock, 
  releaseWakeLock, 
  getKeepScreenAwakePreference 
} from '../../utils/screenWakeLock';

interface PrayerModalProps {
  isOpen: boolean;
  prayerType: PrayerType;
  currentDay?: number; // Optional for daily rosary
  mystery?: MysteryType; // Optional for chaplets
  chaplet?: ChapletType; // Optional for chaplets
  phase?: NovenaPhase; // Optional for daily rosary
  intention?: string;
  onClose: () => void;
  onComplete: () => void;
}

interface PrayerStep {
  id: string;
  title: string;
  content: string | string[];
  type: 'prayer' | 'instruction' | 'mysteries' | 'decades';
}

export const PrayerModal: React.FC<PrayerModalProps> = ({
  isOpen,
  prayerType,
  currentDay = 1,
  mystery,
  chaplet,
  phase = 'petition',
  intention = '',
  onClose,
  onComplete
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Handle wake lock when modal opens/closes
  useEffect(() => {
    if (isOpen && getKeepScreenAwakePreference()) {
      requestWakeLock();
    }

    return () => {
      // Always release wake lock when modal closes or component unmounts
      releaseWakeLock();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isNovena = prayerType === '54-day-novena';
  const isChaplet = prayerType === 'chaplet';

  const prayerSteps: PrayerStep[] = [];

  // Handle chaplet prayers
  if (isChaplet && chaplet) {
    const chapletInfo = CHAPLET_INFO[chaplet];
    const chapletSteps = CHAPLET_PRAYERS[chaplet];

    // Add chaplet intro
    prayerSteps.push({
      id: 'chaplet-intro',
      title: chapletInfo.name,
      content: [
        `You are about to pray the ${chapletInfo.name}.`,
        chapletInfo.description,
        intention ? `Your intention: "${intention}"` : 'Take a moment to set your intention for this prayer.',
        `Estimated duration: ${chapletInfo.estimatedDuration} minutes`,
        'Begin by making the Sign of the Cross.'
      ],
      type: 'instruction'
    });

    // Add each chaplet step
    chapletSteps.forEach((step) => {
      prayerSteps.push({
        id: step.id,
        title: step.title,
        content: Array.isArray(step.content) ? step.content : [step.content],
        type: step.type as 'prayer' | 'instruction' | 'mysteries' | 'decades'
      });
    });

    // Add completion step
    prayerSteps.push({
      id: 'chaplet-complete',
      title: 'Prayer Complete',
      content: [
        'Finish with the Sign of the Cross.',
        `Your ${chapletInfo.name} is now complete.`,
        'May God bless your faithful devotion.'
      ],
      type: 'instruction'
    });

    // Skip the rest of the rosary-specific logic
  } else if (mystery) {

  // Intro step - different for each prayer type
  if (isNovena) {
    prayerSteps.push({
      id: 'intro',
      title: `Day ${currentDay} - ${mystery} Mysteries`,
      content: [
        `Today you are praying the ${mystery} Mysteries during your ${phase} phase.`,
        intention ? `Your intention: "${intention}"` : 'Remember to hold your intention in your heart.',
        'Begin by making the Sign of the Cross.'
      ],
      type: 'instruction'
    });
  } else {
    prayerSteps.push({
      id: 'intro',
      title: `${mystery} Mysteries Rosary`,
      content: [
        `Today you are praying the ${mystery} Mysteries of the Holy Rosary.`,
        intention ? `Your intention: "${intention}"` : 'Take a moment to set your intention for this prayer.',
        'Begin by making the Sign of the Cross.'
      ],
      type: 'instruction'
    });
  }

  // Opening prayer - only for 54-day novena
  if (isNovena) {
    prayerSteps.push({
      id: 'opening-prayer',
      title: 'Opening Prayer to Mary',
      content: getOpeningPrayer(mystery, phase),
      type: 'prayer'
    });
  }

  // Rosary opening prayers
  prayerSteps.push({
    id: 'rosary-opening',
    title: 'Rosary Opening Prayers',
    content: [
      'Pray the following opening prayers:',
      '',
      '• Apostles\' Creed',
      '• 1 Our Father',
      '• 3 Hail Marys (for Faith, Hope, and Charity)',
      '• 1 Glory Be'
    ],
    type: 'instruction'
  });

  // Mysteries introduction
  prayerSteps.push({
    id: 'mysteries-intro',
    title: `The ${mystery} Mysteries`,
    content: [
      `Today you will meditate on the ${mystery} Mysteries:`,
      ...ROSARY_MYSTERIES[mystery].map((m, i) => `${i + 1}. ${m}`)
    ],
    type: 'mysteries'
  });

  // Add each decade as individual steps
  const mysteries = ROSARY_MYSTERIES[mystery];
  const reflections = MYSTERY_REFLECTIONS[mystery];
  
  mysteries.forEach((mysteryName, index) => {
    const ordinal = index === 0 ? '1st' : index === 1 ? '2nd' : index === 2 ? '3rd' : index === 3 ? '4th' : '5th';
    
    const content = [
      `Meditate on: ${mysteryName}. ${reflections[index]}`,
      '',
      'Pray the following:',
      '• 1 Our Father',
      '• 10 Hail Marys (while meditating on this mystery)',
      '• 1 Glory Be',
      '• Fatima Prayer'
    ];

    // Add novena-specific prayers only for 54-day novena
    if (isNovena) {
      const decadePrayers = getDecadePrayers(mystery);
      content.push('', 'Then pray:', `"${decadePrayers[index]}"`);
    }
    
    // Single consolidated step for each decade
    prayerSteps.push({
      id: `decade-${index + 1}`,
      title: `${ordinal} ${mystery} Mystery: ${mysteryName}`,
      content,
      type: 'instruction'
    });
  });

  // Add traditional rosary closing prayers
  prayerSteps.push({
    id: 'hail-holy-queen',
    title: 'Hail Holy Queen',
    content: 'Hail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ.',
    type: 'prayer'
  });

  prayerSteps.push({
    id: 'rosary-prayer',
    title: 'Rosary Prayer',
    content: 'O God, whose only-begotten Son, by His life, death and resurrection, has purchased for us the rewards of eternal life: grant we beseech Thee, that meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain, and obtain what they promise, through the same Christ our Lord. Amen.',
    type: 'prayer'
  });

  // Add novena-specific closing prayer only for 54-day novena
  if (isNovena) {
    prayerSteps.push({
      id: 'closing',
      title: 'Closing Prayer',
      content: getClosingPrayer(phase, mystery, intention),
      type: 'prayer'
    });
  }

  if (!isChaplet) {
    prayerSteps.push({
      id: 'complete',
      title: 'Prayer Complete',
      content: [
        'Finish with the Sign of the Cross.',
        'Your daily novena prayer is now complete.',
        'May God bless your faithful devotion.'
      ],
      type: 'instruction'
    });
  }

  } // Close the else if (mystery) block

  const currentStep = prayerSteps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === prayerSteps.length - 1;

  const nextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    releaseWakeLock();
    onComplete();
    onClose();
    setCurrentStepIndex(0);
  };

  const renderContent = (content: string | string[], type: string) => {
    if (Array.isArray(content)) {
      return (
        <div className="space-y-3">
          {content.map((line, index) => {
            // Check if this line mentions a prayer name that we have expandable content for
            if (line.startsWith('•') && type === 'instruction') {
              const prayerName = line.replace('•', '').trim();
              const prayerText = getPrayerText(prayerName);
              
              if (prayerText) {
                return (
                  <div key={index} className="ml-4">
                    <ExpandablePrayer
                      prayerName={prayerName}
                      prayerText={prayerText}
                      className="mb-2"
                    />
                  </div>
                );
              }
            }
            
            return (
              <p key={index} className={`
                ${type === 'instruction' ? 'text-gray-700 dark:text-gray-300' : 'text-gray-800 dark:text-gray-200'}
                ${line.startsWith('•') ? 'ml-4' : ''}
                ${line === '' ? 'h-2' : ''}
              `}>
                {line}
              </p>
            );
          })}
        </div>
      );
    }

    // Handle single prayer content - check if it's a known prayer (but exclude opening prayer)
    if (type === 'prayer') {
      const prayerText = content as string;
      
      // Skip expandable for opening prayer (contains 54-day novena specific content)
      if (prayerText.includes('Crown of Roses') || prayerText.includes('dispenser of God\'s graces') || prayerText.includes('Queen of the Most Holy Rosary')) {
        // This is the 54-day novena opening prayer - don't make it expandable
      }
      // Check for traditional prayers that should be expandable
      else if (prayerText.includes('Hail, Holy Queen') && prayerText.includes('Mother of Mercy')) {
        return (
          <ExpandablePrayer
            prayerName="Hail Holy Queen"
            prayerText={prayerText}
          />
        );
      }
      else if (prayerText.includes('only-begotten Son') || prayerText.includes('Most Holy Rosary')) {
        return (
          <ExpandablePrayer
            prayerName="Rosary Prayer"
            prayerText={prayerText}
          />
        );
      }
    }

    return (
      <p className={`
        ${type === 'prayer' ? 'font-medium leading-relaxed text-gray-800 dark:text-gray-200' : 'text-gray-700 dark:text-gray-300'}
        ${type === 'prayer' ? 'italic' : ''}
      `}>
        {content}
      </p>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600 transition-colors duration-300">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{currentStep.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Step {currentStepIndex + 1} of {prayerSteps.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 py-2">
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 transition-colors duration-300">
            <div 
              className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / prayerSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className={`
            ${currentStep.type === 'prayer' ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 pl-6 py-4 transition-colors duration-300' : ''}
          `}>
            {renderContent(currentStep.content, currentStep.type)}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-600 p-6 transition-colors duration-300">
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={isFirstStep}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${isFirstStep 
                  ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                } transition-colors duration-300
              `}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {isLastStep ? (
              <button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white px-8 py-2 rounded-lg font-semibold transition-colors duration-300"
              >
                Amen 🙏
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};