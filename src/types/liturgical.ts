// Liturgical Calendar Types for Novena Recommendations

export interface LiturgicalFeast {
  /** Romcal ID for the feast */
  id: string;
  /** Display name for the feast */
  name: string;
  /** Date of the feast (YYYY-MM-DD format) */
  date: string;
  /** Liturgical rank */
  rank: 'SOLEMNITY' | 'FEAST' | 'MEMORIAL' | 'OPTIONAL_MEMORIAL';
  /** Type of feast for categorization */
  type: 'marian' | 'saint' | 'general' | 'seasonal';
  /** Associated novena type if available */
  associatedNovena?: string;
  /** Priority for recommendations (1 = highest, 10 = lowest) */
  priority: number;
  /** Whether this feast should trigger 54-day novena recommendations */
  triggersLongNovena?: boolean;
}

export interface NovenaRecommendation {
  /** Type of novena being recommended */
  type: '9-day' | '54-day';
  /** The feast this novena is for */
  targetFeast: LiturgicalFeast;
  /** When to start the novena */
  startDate: string;
  /** Days until the novena should start */
  daysUntilStart: number;
  /** User-friendly message */
  message: string;
  /** Associated novena type from our constants */
  novenaType?: string;
  /** Urgency level for sorting recommendations */
  urgency: 'high' | 'medium' | 'low';
  /** Unique identifier for this recommendation */
  id: string;
}

export interface FeastNovenaMapping {
  /** Romcal feast ID */
  feastId: string;
  /** Display name for the feast */
  feastName: string;
  /** Our internal novena type */
  novenaType: string;
  /** Type of novena duration */
  durationType: '9-day' | '54-day';
  /** Priority for recommendations */
  priority: number;
  /** Category for filtering */
  category: 'marian' | 'saint' | 'general';
  /** Custom message template */
  messageTemplate?: string;
}

export interface LiturgicalCalendarConfig {
  /** Enable liturgical recommendations */
  enabled: boolean;
  /** Maximum number of recommendations to show */
  maxRecommendations: number;
  /** Days in advance to show recommendations */
  daysInAdvance: number;
  /** Minimum days before feast to show recommendation */
  minDaysBeforeFeast: number;
  /** Show only high priority feasts */
  highPriorityOnly: boolean;
  /** Categories to include */
  includedCategories: ('marian' | 'saint' | 'general')[];
}