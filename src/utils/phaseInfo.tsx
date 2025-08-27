import React from 'react';
import { Heart, Star } from 'lucide-react';
import { NovenaPhase, PhaseInfo } from '../types';

export const getPhaseInfo = (phase: NovenaPhase): PhaseInfo => {
  if (phase === 'petition') {
    return {
      title: 'Days of Petition',
      description: 'Pray for your intention with hope and trust',
      color: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: <Heart className="w-4 h-4" />
    };
  }
  
  return {
    title: 'Days of Thanksgiving', 
    description: 'Pray in gratitude, trusting in God\'s will',
    color: 'bg-amber-50 border-amber-200 text-amber-800',
    icon: <Star className="w-4 h-4" />
  };
};