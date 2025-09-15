import { getRosaryConfig } from '../constants/rosarySequences';
import { PrayerType } from '../types';

export interface PrayerStepMapping {
  stepIndex: number;
  beadIndex: number;
  stepId: string;
  beadId: string;
  description: string;
}

// Create detailed mapping for daily rosary/54-day novena
export const createRosaryStepMapping = (prayerType: PrayerType): PrayerStepMapping[] => {
  const mappings: PrayerStepMapping[] = [];
  
  if (prayerType === 'daily-rosary' || prayerType === '54-day-novena') {
    
    // Intro/Opening steps (0-1) -> Cross (bead 0)
    mappings.push({
      stepIndex: 0,
      beadIndex: 0,
      stepId: 'intro',
      beadId: 'cross',
      description: 'Sign of the Cross, Introduction'
    });
    
    if (prayerType === '54-day-novena') {
      mappings.push({
        stepIndex: 1,
        beadIndex: 0,
        stepId: 'opening-prayer',
        beadId: 'cross',
        description: 'Opening Prayer to Mary'
      });
    }
    
    // Rosary opening prayers (step 2) -> Large bead after cross (bead 1)
    const openingStepIndex = prayerType === '54-day-novena' ? 2 : 1;
    mappings.push({
      stepIndex: openingStepIndex,
      beadIndex: 1,
      stepId: 'rosary-opening',
      beadId: 'large-bead-1',
      description: 'Apostles Creed, Our Father, 3 Hail Marys'
    });
    
    // Mysteries introduction (step 3) -> Medal (bead 6)
    mappings.push({
      stepIndex: openingStepIndex + 1,
      beadIndex: 6,
      stepId: 'mysteries-intro',
      beadId: 'medal-center',
      description: 'Mysteries Introduction'
    });
    
    // Five decades (steps 4-8) -> Decade beads (beads 7, 19, 31, 43, 55)
    const decadeStartBeads = [7, 19, 31, 43, 55];
    for (let decade = 0; decade < 5; decade++) {
      const stepIndex = openingStepIndex + 2 + decade;
      const beadIndex = decadeStartBeads[decade]; // Each decade starts with Our Father large bead
      
      mappings.push({
        stepIndex,
        beadIndex,
        stepId: `decade-${decade + 1}`,
        beadId: `decade-${decade + 1}-large`,
        description: `${decade + 1}${decade === 0 ? 'st' : decade === 1 ? 'nd' : decade === 2 ? 'rd' : 'th'} Mystery`
      });
    }
    
    // Final prayers -> Medal at end
    const finalStepStart = openingStepIndex + 7;
    mappings.push({
      stepIndex: finalStepStart,
      beadIndex: 67,
      stepId: 'hail-holy-queen',
      beadId: 'medal-end',
      description: 'Hail Holy Queen'
    });
    
    mappings.push({
      stepIndex: finalStepStart + 1,
      beadIndex: 68,
      stepId: 'rosary-prayer',
      beadId: 'medal-end',
      description: 'Rosary Prayer'
    });
    
    if (prayerType === '54-day-novena') {
      mappings.push({
        stepIndex: finalStepStart + 2,
        beadIndex: 68,
        stepId: 'closing',
        beadId: 'medal-end',
        description: 'Closing Prayer'
      });
      
      mappings.push({
        stepIndex: finalStepStart + 3,
        beadIndex: 68,
        stepId: 'complete',
        beadId: 'medal-end',
        description: 'Prayer Complete'
      });
    } else {
      mappings.push({
        stepIndex: finalStepStart + 2,
        beadIndex: 68,
        stepId: 'complete',
        beadId: 'medal-end',
        description: 'Prayer Complete'
      });
    }
  }
  
  return mappings;
};

// Create mapping for chaplets
export const createChapletStepMapping = (chapletType: string): PrayerStepMapping[] => {
  const mappings: PrayerStepMapping[] = [];
  const config = getRosaryConfig(chapletType);
  
  // For chaplets, create a simpler linear mapping
  // Each major prayer step corresponds to a key bead
  
  if (chapletType === 'divine-mercy') {
    // Divine Mercy specific mapping
    mappings.push({
      stepIndex: 0,
      beadIndex: 0,
      stepId: 'chaplet-intro',
      beadId: 'cross',
      description: 'Sign of the Cross, Introduction'
    });
    
    mappings.push({
      stepIndex: 1,
      beadIndex: 1,
      stepId: 'opening-prayer',
      beadId: 'large-bead-1',
      description: 'Opening Prayer'
    });
    
    // Five decades of Divine Mercy
    for (let decade = 0; decade < 5; decade++) {
      mappings.push({
        stepIndex: 2 + decade,
        beadIndex: 6 + (decade * 11),
        stepId: `decade-${decade + 1}`,
        beadId: `decade-${decade + 1}-large`,
        description: `Decade ${decade + 1}: For the sake of His sorrowful Passion`
      });
    }
    
    mappings.push({
      stepIndex: 7,
      beadIndex: 61,
      stepId: 'closing-prayer',
      beadId: 'medal-end',
      description: 'Holy God, Holy Mighty One (3x)'
    });
    
    mappings.push({
      stepIndex: 8,
      beadIndex: 61,
      stepId: 'chaplet-complete',
      beadId: 'medal-end',
      description: 'Prayer Complete'
    });
  } else {
    // Generic chaplet mapping
    const totalSteps = Math.min(config.beadSequence.length / 5, 10); // Estimate steps
    
    for (let i = 0; i < totalSteps; i++) {
      const beadIndex = Math.floor((i / totalSteps) * config.beadSequence.length);
      mappings.push({
        stepIndex: i,
        beadIndex,
        stepId: `step-${i}`,
        beadId: config.beadSequence[beadIndex]?.id || `bead-${beadIndex}`,
        description: `Prayer Step ${i + 1}`
      });
    }
  }
  
  return mappings;
};

// Main function to get step mapping for any prayer type
export const getPrayerStepMapping = (prayerType: PrayerType, chapletType?: string): PrayerStepMapping[] => {
  if (prayerType === 'daily-rosary' || prayerType === '54-day-novena') {
    return createRosaryStepMapping(prayerType);
  } else if (prayerType === 'chaplet' && chapletType) {
    return createChapletStepMapping(chapletType);
  }
  
  return [];
};

// Helper functions for the PrayerModal
export const getBeadIndexForStep = (stepIndex: number, prayerType: PrayerType, chapletType?: string): number => {
  const mappings = getPrayerStepMapping(prayerType, chapletType);
  
  // Find exact match first
  const exactMatch = mappings.find(mapping => mapping.stepIndex === stepIndex);
  if (exactMatch) {
    return exactMatch.beadIndex;
  }
  
  // Find closest match (step just before current step)
  const previousMappings = mappings.filter(mapping => mapping.stepIndex <= stepIndex);
  if (previousMappings.length > 0) {
    return previousMappings[previousMappings.length - 1].beadIndex;
  }
  
  // Default to first bead
  return 0;
};

export const getStepIndexForBead = (beadIndex: number, prayerType: PrayerType, chapletType?: string): number => {
  const mappings = getPrayerStepMapping(prayerType, chapletType);
  
  // Find exact match first
  const exactMatch = mappings.find(mapping => mapping.beadIndex === beadIndex);
  if (exactMatch) {
    return exactMatch.stepIndex;
  }
  
  // Find closest match (bead just before current bead)
  const previousMappings = mappings.filter(mapping => mapping.beadIndex <= beadIndex);
  if (previousMappings.length > 0) {
    return previousMappings[previousMappings.length - 1].stepIndex;
  }
  
  // Default to first step
  return 0;
};