import { FeastNovenaMapping } from '../types/liturgical';
import { NovenaType } from '../types';

/**
 * Extensible mapping of liturgical feasts to novena recommendations.
 *
 * To add a new novena recommendation:
 * 1. Add the feast mapping here
 * 2. Ensure the corresponding NovenaType exists in constants/novenas.ts
 * 3. The system will automatically generate recommendations
 */

export const FEAST_TO_NOVENA_MAPPINGS: FeastNovenaMapping[] = [
  // === MARIAN FEASTS ===
  {
    feastId: 'immaculate_conception_of_the_blessed_virgin_mary',
    feastName: 'Immaculate Conception',
    novenaType: 'immaculate-heart' as NovenaType,
    durationType: '9-day',
    priority: 1,
    category: 'marian',
    messageTemplate: 'Prepare for the Solemnity of the Immaculate Conception with a novena to Mary\'s Immaculate Heart'
  },
  {
    feastId: 'assumption_of_the_blessed_virgin_mary',
    feastName: 'Assumption of Mary',
    novenaType: 'blessed-mother' as NovenaType,
    durationType: '9-day',
    priority: 1,
    category: 'marian',
    messageTemplate: 'Honor the Assumption of Our Lady with a novena to the Blessed Mother'
  },
  {
    feastId: 'annunciation_of_the_lord',
    feastName: 'Annunciation',
    novenaType: 'blessed-mother' as NovenaType,
    durationType: '9-day',
    priority: 2,
    category: 'marian',
    messageTemplate: 'Celebrate the Annunciation with a novena to the Blessed Mother'
  },
  {
    feastId: 'nativity_of_the_blessed_virgin_mary',
    feastName: 'Nativity of Mary',
    novenaType: 'blessed-mother' as NovenaType,
    durationType: '9-day',
    priority: 2,
    category: 'marian',
    messageTemplate: 'Prepare for the birthday of Our Lady with a special novena'
  },
  {
    feastId: 'our_lady_of_fatima',
    feastName: 'Our Lady of Fatima',
    novenaType: 'blessed-mother' as NovenaType,
    durationType: '9-day',
    priority: 2,
    category: 'marian',
    messageTemplate: 'Commemorate Our Lady of Fatima with a devotional novena'
  },
  {
    feastId: 'our_lady_of_lourdes',
    feastName: 'Our Lady of Lourdes',
    novenaType: 'blessed-mother' as NovenaType,
    durationType: '9-day',
    priority: 3,
    category: 'marian',
    messageTemplate: 'Honor Our Lady of Lourdes with a healing novena'
  },
  {
    feastId: 'our_lady_of_the_rosary',
    feastName: 'Our Lady of the Rosary',
    novenaType: 'blessed-mother' as NovenaType,
    durationType: '9-day',
    priority: 2,
    category: 'marian',
    messageTemplate: 'Prepare for the feast of Our Lady of the Rosary'
  },

  // === SAINT FEASTS ===
  {
    feastId: 'joseph_spouse_of_mary',
    feastName: 'St. Joseph',
    novenaType: 'st-joseph' as NovenaType,
    durationType: '9-day',
    priority: 1,
    category: 'saint',
    messageTemplate: 'Honor St. Joseph, protector of the Holy Family, with a novena'
  },
  {
    feastId: 'anthony_of_padua_priest',
    feastName: 'St. Anthony of Padua',
    novenaType: 'st-anthony' as NovenaType,
    durationType: '9-day',
    priority: 2,
    category: 'saint',
    messageTemplate: 'Seek St. Anthony\'s intercession with a novena of preparation'
  },
  {
    feastId: 'therese_of_the_child_jesus_and_the_holy_face_of_lisieux_virgin',
    feastName: 'St. Thérèse of Lisieux',
    novenaType: 'st-therese' as NovenaType,
    durationType: '9-day',
    priority: 2,
    category: 'saint',
    messageTemplate: 'Follow the Little Way with a novena to St. Thérèse'
  },
  {
    feastId: 'simon_and_jude_apostles',
    feastName: 'St. Jude',
    novenaType: 'st-jude' as NovenaType,
    durationType: '9-day',
    priority: 2,
    category: 'saint',
    messageTemplate: 'Pray for hopeless causes with a novena to St. Jude'
  }
];

/**
 * Marian feasts that should trigger 54-day novena recommendations.
 * These are major Marian solemnities and feasts.
 */
export const MARIAN_FEASTS_FOR_54_DAY: string[] = [
  'immaculate_conception_of_the_blessed_virgin_mary',
  'assumption_of_the_blessed_virgin_mary',
  'our_lady_of_fatima',
  'our_lady_of_lourdes',
  'nativity_of_the_blessed_virgin_mary',
  'our_lady_of_the_rosary'
];

/**
 * Default configuration for liturgical recommendations
 */
export const DEFAULT_LITURGICAL_CONFIG = {
  enabled: true,
  maxRecommendations: 3,
  daysInAdvance: 14, // Show recommendations up to 2 weeks in advance
  minDaysBeforeFeast: 2, // Don't show recommendations if feast is less than 2 days away
  highPriorityOnly: false,
  includedCategories: ['marian', 'saint'] as ('marian' | 'saint' | 'general')[]
};