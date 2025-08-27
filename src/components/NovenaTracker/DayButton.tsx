import React from 'react';
import { Check } from 'lucide-react';
import { MysteryType } from '../../types';
import { getMysteryColor } from '../../utils/novenaCalculations';

interface DayButtonProps {
  day: number;
  mystery: MysteryType;
  isCompleted: boolean;
  onClick: (day: number) => void;
}

export const DayButton: React.FC<DayButtonProps> = ({
  day,
  mystery,
  isCompleted,
  onClick
}) => {
  const colorClasses = getMysteryColor(mystery);
  const completedColorClasses = isCompleted 
    ? colorClasses.replace('100', '200').replace('300', '400')
    : colorClasses;

  return (
    <button
      onClick={() => onClick(day)}
      className={`
        flex-1 px-2 py-1 rounded text-xs font-medium border transition-all duration-200 hover:scale-105
        ${completedColorClasses}
      `}
      title={`Day ${day} - ${mystery} Mysteries${isCompleted ? ' (Completed)' : ''}`}
    >
      <div className="text-center">
        <div className="font-semibold">{day}</div>
        <div className="text-xs opacity-80">{mystery}</div>
        {isCompleted && <Check className="w-3 h-3 mx-auto mt-1" />}
      </div>
    </button>
  );
};