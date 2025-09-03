import React from 'react';
import { Heart, Star } from 'lucide-react';
import { NovenaPhase, PhaseInfo } from '../types';

export const getPhaseInfo = (phase: NovenaPhase): PhaseInfo => {
  if (phase === 'petition') {
    return {
      title: 'Days of Petition',
      description: 'Pray for your intention with hope and trust',
      color: 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-600 text-blue-800 dark:text-blue-200 transition-colors duration-300',
      icon: <Heart className="w-4 h-4" />
    };
  }
  
  return {
    title: 'Days of Thanksgiving', 
    description: 'Pray in gratitude, trusting in God\'s will',
    color: 'bg-amber-50 dark:bg-amber-900 border-amber-200 dark:border-amber-600 text-amber-800 dark:text-amber-200 transition-colors duration-300',
    icon: <Star className="w-4 h-4" />
  };
};