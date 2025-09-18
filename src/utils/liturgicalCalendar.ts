import { Romcal } from 'romcal';
import {
  LiturgicalFeast,
  NovenaRecommendation,
  LiturgicalCalendarConfig
} from '../types/liturgical';
import {
  FEAST_TO_NOVENA_MAPPINGS,
  MARIAN_FEASTS_FOR_54_DAY,
  DEFAULT_LITURGICAL_CONFIG
} from '../constants/liturgicalMappings';

/**
 * Liturgical Calendar Service
 *
 * Provides liturgical calendar data and generates novena recommendations
 * based on upcoming feasts and holy days.
 */
class LiturgicalCalendarService {
  private romcal: Romcal;
  private calendarCache: Map<number, any> = new Map();
  private config: LiturgicalCalendarConfig = DEFAULT_LITURGICAL_CONFIG;

  constructor() {
    this.romcal = new Romcal();
  }

  /**
   * Get liturgical calendar for a given year
   */
  async getCalendar(year: number): Promise<any> {
    if (this.calendarCache.has(year)) {
      return this.calendarCache.get(year);
    }

    try {
      const calendar = await this.romcal.generateCalendar(year);
      this.calendarCache.set(year, calendar);
      return calendar;
    } catch (error) {
      console.error('Error fetching liturgical calendar:', error);
      return {};
    }
  }

  /**
   * Get all liturgical feasts for a year
   */
  async getFeasts(year: number): Promise<LiturgicalFeast[]> {
    const calendar = await this.getCalendar(year);
    const feasts: LiturgicalFeast[] = [];

    Object.keys(calendar).forEach(dateKey => {
      const celebrations = calendar[dateKey];
      if (Array.isArray(celebrations)) {
        celebrations.forEach(celebration => {
          if (this.isSignificantFeast(celebration)) {
            feasts.push(this.mapToLiturgicalFeast(celebration, dateKey));
          }
        });
      }
    });

    return feasts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  /**
   * Get novena recommendations for the current period
   */
  async getNovenaRecommendations(
    activeNovenas: string[] = [],
    has54DayActive: boolean = false
  ): Promise<NovenaRecommendation[]> {
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextYear = currentYear + 1;

    // Get feasts for current and next year (to handle year transitions)
    const [currentFeasts, nextFeasts] = await Promise.all([
      this.getFeasts(currentYear),
      this.getFeasts(nextYear)
    ]);

    const allFeasts = [...currentFeasts, ...nextFeasts];
    const recommendations: NovenaRecommendation[] = [];

    // Generate 9-day novena recommendations
    for (const feast of allFeasts) {
      const nineDay = this.generate9DayRecommendation(feast, today, activeNovenas);
      if (nineDay) {
        recommendations.push(nineDay);
      }
    }

    // Generate 54-day novena recommendations
    if (!has54DayActive) {
      for (const feast of allFeasts) {
        const fiftyFourDay = this.generate54DayRecommendation(feast, today);
        if (fiftyFourDay) {
          recommendations.push(fiftyFourDay);
        }
      }
    }

    // Sort by urgency and date
    return recommendations
      .sort((a, b) => {
        // First by urgency
        const urgencyOrder = { high: 1, medium: 2, low: 3 };
        const urgencyDiff = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
        if (urgencyDiff !== 0) return urgencyDiff;

        // Then by days until start
        return a.daysUntilStart - b.daysUntilStart;
      })
      .slice(0, this.config.maxRecommendations);
  }

  /**
   * Generate 9-day novena recommendation
   */
  private generate9DayRecommendation(
    feast: LiturgicalFeast,
    today: Date,
    activeNovenas: string[]
  ): NovenaRecommendation | null {
    const mapping = FEAST_TO_NOVENA_MAPPINGS.find(m =>
      m.feastId === feast.id && m.durationType === '9-day'
    );

    if (!mapping) return null;

    // Check if this novena is already active
    if (activeNovenas.includes(mapping.novenaType)) return null;

    const feastDate = new Date(feast.date);
    const novenaStartDate = new Date(feastDate);
    novenaStartDate.setDate(feastDate.getDate() - 9);

    const daysUntilStart = Math.ceil((novenaStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Check if recommendation should be shown
    if (daysUntilStart < 0 || daysUntilStart > this.config.daysInAdvance) return null;
    if (daysUntilStart < this.config.minDaysBeforeFeast) return null;

    // Determine urgency
    let urgency: 'high' | 'medium' | 'low' = 'low';
    if (daysUntilStart <= 3) urgency = 'high';
    else if (daysUntilStart <= 7) urgency = 'medium';

    return {
      type: '9-day',
      targetFeast: feast,
      startDate: novenaStartDate.toISOString().split('T')[0],
      daysUntilStart,
      message: mapping.messageTemplate || `Prepare for ${feast.name} with a novena`,
      novenaType: mapping.novenaType,
      urgency,
      id: `9day-${feast.id}-${feast.date}`
    };
  }

  /**
   * Generate 54-day novena recommendation
   */
  private generate54DayRecommendation(
    feast: LiturgicalFeast,
    today: Date
  ): NovenaRecommendation | null {
    // Only for major Marian feasts
    if (!MARIAN_FEASTS_FOR_54_DAY.includes(feast.id)) return null;

    const feastDate = new Date(feast.date);
    const novenaStartDate = new Date(feastDate);
    novenaStartDate.setDate(feastDate.getDate() - 54);

    const daysUntilStart = Math.ceil((novenaStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Check if recommendation should be shown (wider window for 54-day)
    if (daysUntilStart < 0 || daysUntilStart > this.config.daysInAdvance) return null;

    // Determine urgency
    let urgency: 'high' | 'medium' | 'low' = 'low';
    if (daysUntilStart <= 3) urgency = 'high';
    else if (daysUntilStart <= 7) urgency = 'medium';

    return {
      type: '54-day',
      targetFeast: feast,
      startDate: novenaStartDate.toISOString().split('T')[0],
      daysUntilStart,
      message: `Begin a 54-day novena to culminate on ${feast.name}`,
      urgency,
      id: `54day-${feast.id}-${feast.date}`
    };
  }

  /**
   * Check if a celebration is a significant feast worthy of recommendation
   */
  private isSignificantFeast(celebration: any): boolean {
    const rank = celebration.rank;
    const id = celebration.id;

    // Include major ranks
    if (['SOLEMNITY', 'FEAST', 'MEMORIAL'].includes(rank)) {
      return true;
    }

    // Include specific optional memorials that are popular
    if (rank === 'OPTIONAL_MEMORIAL') {
      const popularOptionalMemorials = [
        'our_lady_of_fatima',
        'our_lady_of_lourdes',
        'our_lady_of_mount_carmel'
      ];
      return popularOptionalMemorials.includes(id);
    }

    return false;
  }

  /**
   * Map romcal celebration to our LiturgicalFeast interface
   */
  private mapToLiturgicalFeast(celebration: any, date: string): LiturgicalFeast {
    const id = celebration.id;
    const rank = celebration.rank as LiturgicalFeast['rank'];

    // Determine type based on feast content
    let type: LiturgicalFeast['type'] = 'general';
    if (this.isMarianFeast(id)) type = 'marian';
    else if (this.isSaintFeast(id)) type = 'saint';

    // Get priority from mapping or default
    const mapping = FEAST_TO_NOVENA_MAPPINGS.find(m => m.feastId === id);
    const priority = mapping?.priority || this.getDefaultPriority(rank);

    return {
      id,
      name: this.formatFeastName(id),
      date,
      rank,
      type,
      associatedNovena: mapping?.novenaType,
      priority,
      triggersLongNovena: MARIAN_FEASTS_FOR_54_DAY.includes(id)
    };
  }

  /**
   * Check if feast is Marian
   */
  private isMarianFeast(id: string): boolean {
    const marianKeywords = ['mary', 'our_lady', 'immaculate', 'assumption', 'annunciation', 'visitation'];
    return marianKeywords.some(keyword => id.toLowerCase().includes(keyword));
  }

  /**
   * Check if feast is for a saint
   */
  private isSaintFeast(id: string): boolean {
    // Most saint feasts contain names or are not seasonal/temporal
    const temporalKeywords = ['sunday', 'weekday', 'christmas', 'easter', 'lent', 'advent'];
    return !temporalKeywords.some(keyword => id.toLowerCase().includes(keyword));
  }

  /**
   * Get default priority based on rank
   */
  private getDefaultPriority(rank: string): number {
    switch (rank) {
      case 'SOLEMNITY': return 1;
      case 'FEAST': return 2;
      case 'MEMORIAL': return 3;
      case 'OPTIONAL_MEMORIAL': return 4;
      default: return 5;
    }
  }

  /**
   * Format feast name for display
   */
  private formatFeastName(id: string): string {
    // Convert snake_case to Title Case
    return id
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<LiturgicalCalendarConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get current configuration
   */
  getConfig(): LiturgicalCalendarConfig {
    return { ...this.config };
  }
}

// Export singleton instance
export const liturgicalCalendar = new LiturgicalCalendarService();
export default liturgicalCalendar;