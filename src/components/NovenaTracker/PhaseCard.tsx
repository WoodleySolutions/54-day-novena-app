import React from 'react';
import { NovenaPhase } from '../../types';
import { getPhaseInfo } from '../../utils/phaseInfo';

interface PhaseCardProps {
  phase: NovenaPhase;
  phaseCompleted: number;
  totalDays: number;
  startDay: number;
  endDay: number;
}

export const PhaseCard: React.FC<PhaseCardProps> = ({
  phase,
  phaseCompleted,
  totalDays,
  startDay,
  endDay
}) => {
  const phaseInfo = getPhaseInfo(phase);
  const completionPercentage = (phaseCompleted / totalDays) * 100;

  return (
    <div className={`border-2 rounded-lg p-4 ${phaseInfo.color}`}>
      <div className="flex items-center gap-2 mb-2">
        {phaseInfo.icon}
        <h3 className="font-semibold">
          Days {startDay}-{endDay}: {phaseInfo.title}
        </h3>
      </div>
      <p className="text-sm mb-3 dark:text-gray-200">{phaseInfo.description}</p>
      <div className="text-xs mb-3 text-gray-600 dark:text-gray-300">
        9 cycles × 3 days (Joyful → Sorrowful → Glorious)
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-white bg-opacity-60 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300">
          <div 
            className="bg-current h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <span className="text-sm font-medium">{phaseCompleted}/{totalDays}</span>
      </div>
    </div>
  );
};