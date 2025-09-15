import { ChapletType } from '../types';

export interface BeadSequence {
  id: string;
  type: 'cross' | 'large-bead' | 'small-bead' | 'medal';
  prayers: string[]; // Which prayer step(s) use this bead
  position: number;
  label?: string; // Optional label for accessibility
}

export interface RosaryConfig {
  prayerType: ChapletType | 'daily-rosary';
  beadSequence: BeadSequence[];
  totalBeads: number;
  name: string;
}

// Standard Rosary Sequence (59 beads total)
export const DAILY_ROSARY_SEQUENCE: BeadSequence[] = [
  // Cross and introductory prayers
  { id: 'cross', type: 'cross', prayers: ['sign-of-cross', 'apostles-creed'], position: 0, label: 'Cross - Sign of the Cross, Apostles\' Creed' },
  
  // First large bead - Our Father
  { id: 'our-father-1', type: 'large-bead', prayers: ['our-father-1'], position: 1, label: 'Large Bead - Our Father' },
  
  // Three Hail Marys
  { id: 'hail-mary-1', type: 'small-bead', prayers: ['hail-mary-1'], position: 2, label: 'Small Bead - Hail Mary for Faith' },
  { id: 'hail-mary-2', type: 'small-bead', prayers: ['hail-mary-2'], position: 3, label: 'Small Bead - Hail Mary for Hope' },
  { id: 'hail-mary-3', type: 'small-bead', prayers: ['hail-mary-3'], position: 4, label: 'Small Bead - Hail Mary for Charity' },
  
  // Glory Be and Fatima Prayer
  { id: 'glory-be-intro', type: 'large-bead', prayers: ['glory-be-intro', 'fatima-prayer-intro'], position: 5, label: 'Large Bead - Glory Be, Fatima Prayer' },
  
  // Medal/Center
  { id: 'center-medal', type: 'medal', prayers: ['announce-mystery'], position: 6, label: 'Center Medal - Announce Mystery' },
  
  // First Decade
  { id: 'decade-1-our-father', type: 'large-bead', prayers: ['decade-1-our-father'], position: 7, label: 'Large Bead - Our Father (1st Mystery)' },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `decade-1-hail-mary-${i + 1}`,
    type: 'small-bead' as const,
    prayers: [`decade-1-hail-mary-${i + 1}`],
    position: 8 + i,
    label: `Small Bead - Hail Mary ${i + 1} (1st Mystery)`
  })),
  { id: 'decade-1-glory-be', type: 'medal', prayers: ['decade-1-glory-be', 'decade-1-fatima'], position: 18, label: 'Medal - Glory Be, Fatima Prayer (1st Mystery)' },
  
  // Second Decade
  { id: 'decade-2-our-father', type: 'large-bead', prayers: ['decade-2-our-father'], position: 19, label: 'Large Bead - Our Father (2nd Mystery)' },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `decade-2-hail-mary-${i + 1}`,
    type: 'small-bead' as const,
    prayers: [`decade-2-hail-mary-${i + 1}`],
    position: 20 + i,
    label: `Small Bead - Hail Mary ${i + 1} (2nd Mystery)`
  })),
  { id: 'decade-2-glory-be', type: 'medal', prayers: ['decade-2-glory-be', 'decade-2-fatima'], position: 30, label: 'Medal - Glory Be, Fatima Prayer (2nd Mystery)' },
  
  // Third Decade
  { id: 'decade-3-our-father', type: 'large-bead', prayers: ['decade-3-our-father'], position: 31, label: 'Large Bead - Our Father (3rd Mystery)' },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `decade-3-hail-mary-${i + 1}`,
    type: 'small-bead' as const,
    prayers: [`decade-3-hail-mary-${i + 1}`],
    position: 32 + i,
    label: `Small Bead - Hail Mary ${i + 1} (3rd Mystery)`
  })),
  { id: 'decade-3-glory-be', type: 'medal', prayers: ['decade-3-glory-be', 'decade-3-fatima'], position: 42, label: 'Medal - Glory Be, Fatima Prayer (3rd Mystery)' },
  
  // Fourth Decade
  { id: 'decade-4-our-father', type: 'large-bead', prayers: ['decade-4-our-father'], position: 43, label: 'Large Bead - Our Father (4th Mystery)' },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `decade-4-hail-mary-${i + 1}`,
    type: 'small-bead' as const,
    prayers: [`decade-4-hail-mary-${i + 1}`],
    position: 44 + i,
    label: `Small Bead - Hail Mary ${i + 1} (4th Mystery)`
  })),
  { id: 'decade-4-glory-be', type: 'medal', prayers: ['decade-4-glory-be', 'decade-4-fatima'], position: 54, label: 'Medal - Glory Be, Fatima Prayer (4th Mystery)' },
  
  // Fifth Decade
  { id: 'decade-5-our-father', type: 'large-bead', prayers: ['decade-5-our-father'], position: 55, label: 'Large Bead - Our Father (5th Mystery)' },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `decade-5-hail-mary-${i + 1}`,
    type: 'small-bead' as const,
    prayers: [`decade-5-hail-mary-${i + 1}`],
    position: 56 + i,
    label: `Small Bead - Hail Mary ${i + 1} (5th Mystery)`
  })),
  { id: 'decade-5-glory-be', type: 'medal', prayers: ['decade-5-glory-be', 'decade-5-fatima'], position: 66, label: 'Medal - Glory Be, Fatima Prayer (5th Mystery)' },
  
  // Closing prayers
  { id: 'hail-holy-queen', type: 'medal', prayers: ['hail-holy-queen'], position: 67, label: 'Medal - Hail Holy Queen' },
  { id: 'closing-prayer', type: 'medal', prayers: ['closing-prayer'], position: 68, label: 'Medal - Closing Prayer' }
];

// Divine Mercy Chaplet (uses same rosary beads)
export const DIVINE_MERCY_SEQUENCE: BeadSequence[] = [
  { id: 'cross', type: 'cross', prayers: ['sign-of-cross', 'opening-prayer'], position: 0, label: 'Cross - Sign of the Cross, Opening Prayer' },
  { id: 'our-father-1', type: 'large-bead', prayers: ['our-father'], position: 1, label: 'Large Bead - Our Father' },
  { id: 'hail-mary-1', type: 'small-bead', prayers: ['hail-mary-1'], position: 2, label: 'Small Bead - Hail Mary' },
  { id: 'hail-mary-2', type: 'small-bead', prayers: ['hail-mary-2'], position: 3, label: 'Small Bead - Hail Mary' },
  { id: 'hail-mary-3', type: 'small-bead', prayers: ['hail-mary-3'], position: 4, label: 'Small Bead - Hail Mary' },
  { id: 'apostles-creed', type: 'large-bead', prayers: ['apostles-creed'], position: 5, label: 'Large Bead - Apostles\' Creed' },
  
  // Five decades of Divine Mercy prayers
  ...Array.from({ length: 5 }, (_, decade) => {
    const decadeStart = 6 + (decade * 11);
    return [
      {
        id: `decade-${decade + 1}-eternal-father`,
        type: 'large-bead' as const,
        prayers: [`decade-${decade + 1}-eternal-father`],
        position: decadeStart,
        label: `Large Bead - Eternal Father (${decade + 1})`
      },
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `decade-${decade + 1}-mercy-${i + 1}`,
        type: 'small-bead' as const,
        prayers: [`decade-${decade + 1}-mercy-${i + 1}`],
        position: decadeStart + 1 + i,
        label: `Small Bead - For the sake of His sorrowful Passion... (${decade + 1})`
      }))
    ];
  }).flat(),
  
  { id: 'closing-trisagion', type: 'medal', prayers: ['trisagion-1', 'trisagion-2', 'trisagion-3'], position: 61, label: 'Medal - Holy God (3x)' }
];

// Seven Sorrows Chaplet (52 beads)
export const SEVEN_SORROWS_SEQUENCE: BeadSequence[] = [
  { id: 'cross', type: 'cross', prayers: ['sign-of-cross', 'act-of-contrition'], position: 0, label: 'Cross - Sign of Cross, Act of Contrition' },
  
  // Seven groups of 7 Hail Marys each
  ...Array.from({ length: 7 }, (_, sorrow) => {
    const sorrowStart = 1 + (sorrow * 7);
    return [
      ...Array.from({ length: 7 }, (_, i) => ({
        id: `sorrow-${sorrow + 1}-hail-mary-${i + 1}`,
        type: 'small-bead' as const,
        prayers: [`sorrow-${sorrow + 1}-hail-mary-${i + 1}`],
        position: sorrowStart + i,
        label: `Small Bead - Hail Mary ${i + 1} (${sorrow + 1}${sorrow === 0 ? 'st' : sorrow === 1 ? 'nd' : sorrow === 2 ? 'rd' : 'th'} Sorrow)`
      }))
    ];
  }).flat(),
  
  { id: 'closing-prayer', type: 'medal', prayers: ['closing-prayer'], position: 50, label: 'Medal - Closing Prayer' }
];

// St. Michael Chaplet (39 beads)
export const ST_MICHAEL_SEQUENCE: BeadSequence[] = [
  { id: 'cross', type: 'cross', prayers: ['sign-of-cross', 'opening-prayer'], position: 0, label: 'Cross - Sign of Cross, Opening Prayer' },
  
  // Nine angelic choirs (4 beads each: 1 Our Father + 3 Hail Marys)
  ...Array.from({ length: 9 }, (_, choir) => {
    const choirStart = 1 + (choir * 4);
    const choirNames = ['Seraphim', 'Cherubim', 'Thrones', 'Dominions', 'Powers', 'Virtues', 'Principalities', 'Archangels', 'Angels'];
    return [
      {
        id: `choir-${choir + 1}-our-father`,
        type: 'large-bead' as const,
        prayers: [`choir-${choir + 1}-our-father`],
        position: choirStart,
        label: `Large Bead - Our Father (${choirNames[choir]})`
      },
      ...Array.from({ length: 3 }, (_, i) => ({
        id: `choir-${choir + 1}-hail-mary-${i + 1}`,
        type: 'small-bead' as const,
        prayers: [`choir-${choir + 1}-hail-mary-${i + 1}`],
        position: choirStart + 1 + i,
        label: `Small Bead - Hail Mary ${i + 1} (${choirNames[choir]})`
      }))
    ];
  }).flat(),
  
  { id: 'st-michael-prayer', type: 'medal', prayers: ['st-michael-prayer'], position: 37, label: 'Medal - St. Michael Prayer' }
];

// Rosary configurations for each prayer type
export const ROSARY_CONFIGS: Record<ChapletType | 'daily-rosary', RosaryConfig> = {
  'daily-rosary': {
    prayerType: 'daily-rosary',
    beadSequence: DAILY_ROSARY_SEQUENCE,
    totalBeads: 69,
    name: 'Daily Rosary'
  },
  'divine-mercy': {
    prayerType: 'divine-mercy',
    beadSequence: DIVINE_MERCY_SEQUENCE,
    totalBeads: 62,
    name: 'Divine Mercy Chaplet'
  },
  'seven-sorrows': {
    prayerType: 'seven-sorrows',
    beadSequence: SEVEN_SORROWS_SEQUENCE,
    totalBeads: 51,
    name: 'Seven Sorrows Chaplet'
  },
  'st-michael': {
    prayerType: 'st-michael',
    beadSequence: ST_MICHAEL_SEQUENCE,
    totalBeads: 38,
    name: 'St. Michael Chaplet'
  },
  'sacred-heart': {
    prayerType: 'sacred-heart',
    beadSequence: [
      { id: 'cross', type: 'cross', prayers: ['sign-of-cross'], position: 0, label: 'Cross - Sign of Cross' },
      ...Array.from({ length: 33 }, (_, i) => ({
        id: `prayer-${i + 1}`,
        type: i % 3 === 0 ? 'large-bead' as const : 'small-bead' as const,
        prayers: [`prayer-${i + 1}`],
        position: i + 1,
        label: `${i % 3 === 0 ? 'Large' : 'Small'} Bead - Prayer ${i + 1}`
      }))
    ],
    totalBeads: 34,
    name: 'Sacred Heart Chaplet'
  },
  'precious-blood': {
    prayerType: 'precious-blood',
    beadSequence: [
      { id: 'cross', type: 'cross', prayers: ['sign-of-cross'], position: 0, label: 'Cross - Sign of Cross' },
      ...Array.from({ length: 33 }, (_, i) => ({
        id: `prayer-${i + 1}`,
        type: i % 7 === 0 ? 'large-bead' as const : 'small-bead' as const,
        prayers: [`prayer-${i + 1}`],
        position: i + 1,
        label: `${i % 7 === 0 ? 'Large' : 'Small'} Bead - Prayer ${i + 1}`
      }))
    ],
    totalBeads: 34,
    name: 'Precious Blood Chaplet'
  },
  'holy-face': {
    prayerType: 'holy-face',
    beadSequence: [
      { id: 'cross', type: 'cross', prayers: ['sign-of-cross'], position: 0, label: 'Cross - Sign of Cross' },
      ...Array.from({ length: 33 }, (_, i) => ({
        id: `prayer-${i + 1}`,
        type: 'small-bead' as const,
        prayers: [`prayer-${i + 1}`],
        position: i + 1,
        label: `Small Bead - Prayer ${i + 1}`
      }))
    ],
    totalBeads: 34,
    name: 'Holy Face Chaplet'
  },
  'immaculate-heart': {
    prayerType: 'immaculate-heart',
    beadSequence: [
      { id: 'cross', type: 'cross', prayers: ['sign-of-cross'], position: 0, label: 'Cross - Sign of Cross' },
      ...Array.from({ length: 54 }, (_, i) => ({
        id: `prayer-${i + 1}`,
        type: i % 10 === 0 ? 'large-bead' as const : 'small-bead' as const,
        prayers: [`prayer-${i + 1}`],
        position: i + 1,
        label: `${i % 10 === 0 ? 'Large' : 'Small'} Bead - Prayer ${i + 1}`
      }))
    ],
    totalBeads: 55,
    name: 'Immaculate Heart Chaplet'
  },
  'st-joseph': {
    prayerType: 'st-joseph',
    beadSequence: [
      { id: 'cross', type: 'cross', prayers: ['sign-of-cross'], position: 0, label: 'Cross - Sign of Cross' },
      ...Array.from({ length: 30 }, (_, i) => ({
        id: `prayer-${i + 1}`,
        type: i % 6 === 0 ? 'large-bead' as const : 'small-bead' as const,
        prayers: [`prayer-${i + 1}`],
        position: i + 1,
        label: `${i % 6 === 0 ? 'Large' : 'Small'} Bead - Prayer ${i + 1}`
      }))
    ],
    totalBeads: 31,
    name: 'St. Joseph Chaplet'
  },
  'five-wounds': {
    prayerType: 'five-wounds',
    beadSequence: [
      { id: 'cross', type: 'cross', prayers: ['sign-of-cross'], position: 0, label: 'Cross - Sign of Cross' },
      ...Array.from({ length: 33 }, (_, i) => ({
        id: `prayer-${i + 1}`,
        type: i % 5 === 0 ? 'large-bead' as const : 'small-bead' as const,
        prayers: [`prayer-${i + 1}`],
        position: i + 1,
        label: `${i % 5 === 0 ? 'Large' : 'Small'} Bead - Prayer ${i + 1}`
      }))
    ],
    totalBeads: 34,
    name: 'Five Wounds Chaplet'
  },
  'st-bridget': {
    prayerType: 'st-bridget',
    beadSequence: [
      { id: 'cross', type: 'cross', prayers: ['sign-of-cross'], position: 0, label: 'Cross - Sign of Cross' },
      ...Array.from({ length: 63 }, (_, i) => ({
        id: `prayer-${i + 1}`,
        type: i < 7 || (i >= 14 && i < 21) ? 'large-bead' as const : 'small-bead' as const,
        prayers: [`prayer-${i + 1}`],
        position: i + 1,
        label: `${i < 7 || (i >= 14 && i < 21) ? 'Large' : 'Small'} Bead - Prayer ${i + 1}`
      }))
    ],
    totalBeads: 64,
    name: 'St. Bridget Chaplet'
  }
};

// Helper function to get rosary config by prayer type
export const getRosaryConfig = (prayerType: ChapletType | 'daily-rosary' | '54-day-novena' | 'chaplet' | string): RosaryConfig => {
  // Map prayer types to rosary configs
  if (prayerType === '54-day-novena' || prayerType === 'daily-rosary') {
    return ROSARY_CONFIGS['daily-rosary'];
  }
  
  // For chaplet type, use the default divine mercy sequence
  if (prayerType === 'chaplet') {
    return ROSARY_CONFIGS['divine-mercy'];
  }
  
  // For specific chaplet types
  if (prayerType in ROSARY_CONFIGS) {
    return ROSARY_CONFIGS[prayerType as keyof typeof ROSARY_CONFIGS];
  }
  
  // Default fallback
  return ROSARY_CONFIGS['daily-rosary'];
};