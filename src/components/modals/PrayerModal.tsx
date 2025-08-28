import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { MysteryType, NovenaPhase } from '../../types';
import { getOpeningPrayer, getClosingPrayer, getDecadePrayers } from '../../utils/prayers';
import { ROSARY_MYSTERIES } from '../../constants/novena';

interface PrayerModalProps {
  isOpen: boolean;
  currentDay: number;
  mystery: MysteryType;
  phase: NovenaPhase;
  intention: string;
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
  currentDay,
  mystery,
  phase,
  intention,
  onClose,
  onComplete
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const prayerSteps: PrayerStep[] = [
    {
      id: 'intro',
      title: `Day ${currentDay} - ${mystery} Mysteries`,
      content: [
        `Today you are praying the ${mystery} Mysteries during your ${phase} phase.`,
        intention ? `Your intention: "${intention}"` : 'Remember to hold your intention in your heart.',
        'Begin by making the Sign of the Cross.'
      ],
      type: 'instruction'
    },
    {
      id: 'opening-prayer',
      title: 'Opening Prayer to Mary',
      content: getOpeningPrayer(mystery, phase),
      type: 'prayer'
    },
    {
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
    },
    {
      id: 'mysteries-intro',
      title: `The ${mystery} Mysteries`,
      content: [
        `Today you will meditate on the ${mystery} Mysteries:`,
        ...ROSARY_MYSTERIES[mystery].map((m, i) => `${i + 1}. ${m}`)
      ],
      type: 'mysteries'
    }
  ];

  // Add each decade as individual steps
  const mysteries = ROSARY_MYSTERIES[mystery];
  const decadePrayers = getDecadePrayers(mystery);
  
  mysteries.forEach((mysteryName, index) => {
    const ordinal = index === 0 ? '1st' : index === 1 ? '2nd' : index === 2 ? '3rd' : index === 3 ? '4th' : '5th';
    
    // Single consolidated step for each decade
    prayerSteps.push({
      id: `decade-${index + 1}`,
      title: `${ordinal} Decade: ${mysteryName}`,
      content: [
        `Meditate on: ${mysteryName}`,
        '',
        'Pray the following:',
        '• 1 Our Father',
        '• 10 Hail Marys (while meditating on this mystery)',
        '• 1 Glory Be',
        '• The Fatima Prayer: "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those most in need of Thy mercy."',
        '',
        'Then pray:',
        `"${decadePrayers[index]}"`
      ],
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

  // Add closing
  prayerSteps.push({
    id: 'closing',
    title: 'Closing Prayer',
    content: getClosingPrayer(phase, mystery, intention),
    type: 'prayer'
  });

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
    onComplete();
    onClose();
    setCurrentStepIndex(0);
  };

  const renderContent = (content: string | string[], type: string) => {
    if (Array.isArray(content)) {
      return (
        <div className="space-y-3">
          {content.map((line, index) => (
            <p key={index} className={`
              ${type === 'instruction' ? 'text-gray-700' : 'text-gray-800'}
              ${line.startsWith('•') ? 'ml-4' : ''}
              ${line === '' ? 'h-2' : ''}
            `}>
              {line}
            </p>
          ))}
        </div>
      );
    }

    return (
      <p className={`
        ${type === 'prayer' ? 'font-medium leading-relaxed text-gray-800' : 'text-gray-700'}
        ${type === 'prayer' ? 'italic' : ''}
      `}>
        {content}
      </p>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{currentStep.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Step {currentStepIndex + 1} of {prayerSteps.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 py-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / prayerSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className={`
            ${currentStep.type === 'prayer' ? 'bg-blue-50 border-l-4 border-blue-400 pl-6 py-4' : ''}
          `}>
            {renderContent(currentStep.content, currentStep.type)}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6">
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={isFirstStep}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${isFirstStep 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {isLastStep ? (
              <button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg font-semibold transition-colors"
              >
                Amen 🙏
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
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