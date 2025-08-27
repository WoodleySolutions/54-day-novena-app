/**
 * 54-Day Novena Tracker - React Web Application
 * 
 * OVERVIEW:
 * A Catholic prayer tracking application for the traditional 54-day novena practice.
 * The novena consists of 54 days of daily rosary prayers divided into two phases:
 * - 27 days of petition (asking for intentions)  
 * - 27 days of thanksgiving (gratitude regardless of outcome)
 * 
 * STRUCTURE:
 * Each 27-day phase contains 9 cycles of 3 days each.
 * Each 3-day cycle rotates through rosary mysteries: Joyful → Sorrowful → Glorious
 * This ensures each mystery type is prayed exactly 9 times per phase (18 times total).
 * 
 * DEVELOPMENT ROADMAP:
 * 1. Web MVP (current) - React web app with localStorage persistence
 * 2. React Native mobile apps for iOS/Android
 * 3. App store deployment and user feedback
 * 4. Premium features and monetization
 * 
 * MONETIZATION PLAN:
 * - Freemium model: Basic tracker free, premium features $2.99-4.99/year
 * - Premium features: Multiple novenas, prayer libraries, analytics, export
 * - Target: Catholic community with strong word-of-mouth potential
 * 
 * TECHNICAL STACK:
 * - Frontend: React with hooks, Tailwind CSS
 * - Mobile: React Native (future)
 * - Hosting: Static hosting (Netlify/Vercel)
 * - Storage: localStorage for web, AsyncStorage for mobile
 * 
 * NEXT DEVELOPMENT STEPS:
 * 1. Add localStorage persistence for production deployment
 * 2. Enhance UI/UX based on user feedback
 * 3. Add prayer text content and guidance
 * 4. Implement React Native version
 * 5. App store submission process
 * 
 * Author: [Your Name]
 * Created: August 2025
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Check, Heart, Star, BookOpen, Clock } from 'lucide-react';

const NovenaTracker = () => {
  // State management
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState(new Set());
  const [startDate, setStartDate] = useState(null);
  const [intention, setIntention] = useState('');
  const [showIntentionModal, setShowIntentionModal] = useState(false);

  // TODO: Implement localStorage persistence for production
  // This will allow data to persist across browser sessions
  useEffect(() => {
    // Load saved data on component mount
    // const savedData = localStorage.getItem('novenaProgress');
    // if (savedData) {
    //   const { completedDays, startDate, intention, currentDay } = JSON.parse(savedData);
    //   setCompletedDays(new Set(completedDays));
    //   setStartDate(new Date(startDate));
    //   setIntention(intention);
    //   setCurrentDay(currentDay);
    // }
  }, []);

  // TODO: Save data whenever state changes (production)
  // useEffect(() => {
  //   if (startDate) {
  //     const dataToSave = {
  //       completedDays: Array.from(completedDays),
  //       startDate: startDate.toISOString(),
  //       intention,
  //       currentDay
  //     };
  //     localStorage.setItem('novenaProgress', JSON.stringify(dataToSave));
  //   }
  // }, [completedDays, startDate, intention, currentDay]);

  /**
   * Determines which phase a given day belongs to
   * @param {number} day - Day number (1-54)
   * @returns {string} - 'petition' or 'thanksgiving'
   */
  const isCurrentPhase = (day) => day <= 27 ? 'petition' : 'thanksgiving';
  
  /**
   * Calculates which rosary mysteries should be prayed on a given day
   * Based on 3-day rotation: Joyful → Sorrowful → Glorious
   * @param {number} day - Day number (1-54)
   * @returns {string} - 'Joyful', 'Sorrowful', or 'Glorious'
   */
  const getMysteryForDay = (day) => {
    const dayInCycle = ((day - 1) % 3) + 1;
    const mysteries = ['Joyful', 'Sorrowful', 'Glorious'];
    return mysteries[dayInCycle - 1];
  };

  /**
   * Gets comprehensive information about a specific day
   * @param {number} day - Day number (1-54)
   * @returns {object} - Phase, cycle number, and mystery type
   */
  const getCycleInfo = (day) => {
    const phase = isCurrentPhase(day);
    const adjustedDay = phase === 'petition' ? day : day - 27;
    const cycle = Math.ceil(adjustedDay / 3);
    return { phase, cycle, mystery: getMysteryForDay(day) };
  };
  
  /**
   * Returns styling and content information for each phase
   * @param {string} phase - 'petition' or 'thanksgiving'
   * @returns {object} - Title, description, colors, and icon
   */
  const getPhaseInfo = (phase) => {
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

  /**
   * Returns the specific opening prayer for each mystery type and phase
   * @param {string} mystery - 'Joyful', 'Sorrowful', or 'Glorious'
   * @param {string} phase - 'petition' or 'thanksgiving'
   * @returns {string} - The opening prayer text
   */
  const getOpeningPrayer = (mystery, phase) => {
    const isPetition = phase === 'petition';
    const baseStart = isPetition 
      ? "Hail, Queen of the Most Holy Rosary, my Mother Mary, hail! At thy feet I humbly kneel to offer thee a Crown of Roses"
      : "Hail, Queen of the Most Holy Rosary, my Mother Mary, hail! At thy feet I gratefully kneel to offer thee a Crown of Roses";

    const mysteryDescriptions = {
      'Joyful': "snow white buds to remind thee of thy joys",
      'Sorrowful': "blood red roses to remind thee of the passion of thy divine Son, with Whom thou didst so fully partake of its bitterness",
      'Glorious': "full-blown white roses, tinged with the red of the passion, to remind thee of thy glories, fruits of the sufferings of thy Son and thee"
    };

    const baseEnd = isPetition
      ? ", each rose recalling to thee a holy mystery, each 10 bound together with my petition for a particular grace. O Holy Queen, dispenser of God's graces, and Mother of all who invoke thee! Thou canst not look upon my gift and fail to see its binding. As thou receivest my gift, so wilt thou receive my petition; from thy bounty thou wilt give me the favor I so earnestly and trustingly seek. I despair of nothing that I ask of thee. Show thyself my Mother!"
      : ", each rose recalling to thee a holy mystery; each ten bound together with my petition for a particular grace. O Holy Queen, dispenser of God's graces, and Mother of all who invoke thee! Thou canst not look upon my gift and fail to see its binding. As thou receivest my gift, so wilt thou receive my thanksgiving; from thy bounty thou hast given me the favor I so earnestly and trustingly sought. I despaired not of what I asked of thee, and thou hast truly shown thyself my Mother.";

    return `${baseStart}, ${mysteryDescriptions[mystery]}${baseEnd}`;
  };

  /**
   * Returns the specific closing prayer for each phase
   * @param {string} phase - 'petition' or 'thanksgiving'
   * @returns {string} - The closing prayer text
   */
  const getClosingPrayer = (phase) => {
    return phase === 'petition'
      ? "Sweet Mother Mary, I offer thee this spiritual communion to bind my bouquets in a wreath to place upon thy brow. O my Mother! Look with favor upon my gift, and in thy love obtain for me my request."
      : "Sweet Mother Mary, I offer thee this Spiritual Communion to bind my bouquets in a wreath to place upon thy brow in thanksgiving for my request which thou in thy love hast obtained for me.";
  };

  /**
   * Returns the specific concluding prayers for each decade based on mystery
   * @param {string} mystery - 'Joyful', 'Sorrowful', or 'Glorious'
   * @returns {Array} - Array of decade concluding prayers
   */
  const getDecadePrayers = (mystery) => {
    const prayers = {
      'Joyful': [
        "I bind these snow-white buds with a petition for the virtue of humility and humbly lay this bouquet at thy feet.",
        "I bind these snow-white buds with a petition for the virtue of charity and humbly lay this bouquet at thy feet.",
        "I bind these snow-white buds with a petition for the virtue of detachment from the world and humbly lay this bouquet at thy feet.",
        "I bind these snow-white buds with a petition for the virtue of purity and humbly lay this bouquet at thy feet.",
        "I bind these snow-white buds with a petition for the virtue of obedience to the will of God and humbly lay this bouquet at thy feet."
      ],
      'Sorrowful': [
        "I bind these blood red roses with a petition for the virtue of resignation to the will of God and humbly lay this bouquet at thy feet.",
        "I bind these blood red roses with a petition for the virtue of mortification and humbly lay this bouquet at thy feet.",
        "I bind these blood red roses with a petition for the virtue of humility and humbly lay this bouquet at thy feet.",
        "I bind these blood red roses with a petition for the virtue of patience in adversity and humbly lay this bouquet at thy feet.",
        "I bind these blood red roses with a petition for the virtue of love of our enemies and humbly lay this bouquet at thy feet."
      ],
      'Glorious': [
        "I bind these full-blown roses with a petition for the virtue of faith and humbly lay this bouquet at thy feet.",
        "I bind these full-blown roses with a petition for the virtue of hope and humbly lay this bouquet at thy feet.",
        "I bind these full-blown roses with a petition for the virtue of charity and humbly lay this bouquet at thy feet.",
        "I bind these full-blown roses with a petition for the virtue of union with Christ and humbly lay this bouquet at thy feet.",
        "I bind these full-blown roses with a petition for the virtue of union with thee and humbly lay this bouquet at thy feet."
      ]
    };
    return prayers[mystery] || [];
  };

  /**
   * Returns the names of the five mysteries for each type
   * @param {string} mystery - 'Joyful', 'Sorrowful', or 'Glorious'
   * @returns {Array} - Array of mystery names
   */
  /**
   * Returns liturgically appropriate colors for each mystery type
   * Colors chosen based on Catholic liturgical traditions:
   * - Joyful: Gold (celebration, Christmas, joy)
   * - Sorrowful: Purple (penance, Lent, sacrifice)  
   * - Glorious: Blue (heaven, glory, victory)
   * @param {string} mystery - 'Joyful', 'Sorrowful', or 'Glorious'
   * @returns {string} - Tailwind CSS classes for styling
   */
  const getMysteryColor = (mystery) => {
    switch(mystery) {
      case 'Joyful': return 'bg-amber-100 border-amber-300 text-amber-800';
      case 'Sorrowful': return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'Glorious': return 'bg-blue-100 border-blue-300 text-blue-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  /**
   * Toggles completion status for a specific day
   * @param {number} day - Day number to mark complete/incomplete
   */
  const markDayComplete = (day) => {
    const newCompleted = new Set(completedDays);
    if (newCompleted.has(day)) {
      newCompleted.delete(day);
    } else {
      newCompleted.add(day);
    }
    setCompletedDays(newCompleted);
  };

  /**
   * Initializes a new novena by setting start date and showing intention modal
   */
  const startNovena = () => {
    setStartDate(new Date());
    setShowIntentionModal(true);
  };

  // Calculate overall completion percentage
  const completionPercentage = Math.round((completedDays.size / 54) * 100);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Application Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">54-Day Novena Tracker</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track your journey through 27 days of petition followed by 27 days of thanksgiving. 
          Each day includes the rosary with additional prayers.
        </p>
      </div>

      {/* Progress Overview Section */}
      {startDate && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Your Progress</h2>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">{completedDays.size}/54</div>
              <div className="text-sm text-gray-500">days completed</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          
          {/* User's Intention Display */}
          {intention && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Your Intention:</h3>
              <p className="text-gray-600 italic">"{intention}"</p>
            </div>
          )}
        </div>
      )}

      {/* Start Novena or Main Tracking Interface */}
      {!startDate ? (
        // Initial Start Screen
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <Calendar className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Begin Your 54-Day Novena</h3>
          <p className="text-gray-600 mb-6">
            Start your spiritual journey of prayer and devotion. Set your intention and 
            begin tracking your daily progress through both phases of this powerful novena.
          </p>
          <button 
            onClick={startNovena}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Start Novena
          </button>
        </div>
      ) : (
        <>
          {/* Phase Overview Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {['petition', 'thanksgiving'].map((phase, index) => {
              const phaseInfo = getPhaseInfo(phase);
              const phaseDays = phase === 'petition' ? 
                Array.from({length: 27}, (_, i) => i + 1) :
                Array.from({length: 27}, (_, i) => i + 28);
              const phaseCompleted = phaseDays.filter(day => completedDays.has(day)).length;
              
              return (
                <div key={phase} className={`border-2 rounded-lg p-4 ${phaseInfo.color}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {phaseInfo.icon}
                    <h3 className="font-semibold">Days {index === 0 ? '1-27' : '28-54'}: {phaseInfo.title}</h3>
                  </div>
                  <p className="text-sm mb-3">{phaseInfo.description}</p>
                  <div className="text-xs mb-3 text-gray-600">
                    9 cycles × 3 days (Joyful → Sorrowful → Glorious)
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white bg-opacity-60 rounded-full h-2">
                      <div 
                        className="bg-current h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(phaseCompleted / 27) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{phaseCompleted}/27</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Daily Progress Grid */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Daily Progress</h3>
            
            {/* Cycle-by-Cycle Breakdown */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {['petition', 'thanksgiving'].map((phase, phaseIndex) => {
                const phaseStart = phase === 'petition' ? 1 : 28;
                return (
                  <div key={phase}>
                    <h4 className="font-semibold text-gray-700 mb-3 capitalize">{phase} Phase</h4>
                    <div className="space-y-3">
                      {/* Display each 3-day cycle */}
                      {Array.from({length: 9}, (_, cycleIndex) => {
                        const cycleStart = phaseStart + (cycleIndex * 3);
                        const cycleDays = [cycleStart, cycleStart + 1, cycleStart + 2];
                        const mysteries = ['Joyful', 'Sorrowful', 'Glorious'];
                        
                        return (
                          <div key={cycleIndex} className="border border-gray-200 rounded p-3">
                            <div className="text-sm font-medium text-gray-600 mb-2">
                              Cycle {cycleIndex + 1} (Days {cycleStart}-{cycleStart + 2})
                            </div>
                            <div className="flex gap-1">
                              {/* Three days per cycle */}
                              {cycleDays.map((day, dayIndex) => {
                                const isCompleted = completedDays.has(day);
                                const mystery = mysteries[dayIndex];
                                
                                return (
                                  <button
                                    key={day}
                                    onClick={() => markDayComplete(day)}
                                    className={`
                                      flex-1 px-2 py-1 rounded text-xs font-medium border transition-all duration-200 hover:scale-105
                                      ${isCompleted 
                                        ? getMysteryColor(mystery).replace('100', '200').replace('300', '400')
                                        : getMysteryColor(mystery)
                                      }
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
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Today's Prayer Focus */}
          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-800">Today's Prayer Focus</h3>
            </div>
            
            <div className="space-y-4">
              {/* Daily Prayer Components */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-2">Daily Prayers Include:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• The Holy Rosary (5 decades)</li>
                  <li>• Opening prayers to the Sacred Heart</li>
                  <li>• Prayer for your specific intention</li>
                  <li>• Closing prayers of trust and surrender</li>
                </ul>
              </div>
              
              {/* Current Day Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`rounded-lg p-4 border-2 ${getPhaseInfo(isCurrentPhase(currentDay)).color}`}>
                  <h4 className="font-semibold mb-2">
                    Current Phase: {getPhaseInfo(isCurrentPhase(currentDay)).title}
                  </h4>
                  <p className="text-sm">
                    {getPhaseInfo(isCurrentPhase(currentDay)).description}
                  </p>
                </div>
                
                <div className={`rounded-lg p-4 border-2 ${getMysteryColor(getMysteryForDay(currentDay))}`}>
                  <h4 className="font-semibold mb-2">
                    Today's Mysteries: {getMysteryForDay(currentDay)}
                  </h4>
                  <p className="text-sm">
                    {(() => {
                      const { cycle } = getCycleInfo(currentDay);
                      const dayInCycle = ((currentDay - 1) % 3) + 1;
                      return `Cycle ${cycle}, Day ${dayInCycle} of 3-day rotation`;
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Intention Setting Modal */}
      {showIntentionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Set Your Intention</h3>
            <p className="text-gray-600 mb-4">
              What intention would you like to carry through your 54-day novena?
            </p>
            <textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="Enter your prayer intention..."
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 resize-none"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowIntentionModal(false);
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
              >
                Begin Novena
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NovenaTracker;

/*
FUTURE ENHANCEMENTS (Premium Features):
- Multiple concurrent novenas
- Prayer text libraries (other novenas, litanies, stations of the cross)
- Progress analytics and streak tracking
- Custom intention categories
- Export progress reports
- Reminder notifications
- Prayer journal integration
- Share progress with prayer groups
- Offline prayer content
- Audio prayer guides

TECHNICAL DEBT TO ADDRESS:
- Add comprehensive TypeScript types
- Implement proper error handling
- Add unit tests (Jest/React Testing Library)
- Optimize for accessibility (ARIA labels, keyboard navigation)
- Add internationalization support
- Implement proper loading states
- Add data validation for user inputs
- Consider implementing Redux/Context for state management as features grow

DEPLOYMENT CHECKLIST:
1. Add localStorage persistence
2. Configure build process (Create React App or Vite)
3. Set up hosting (Netlify/Vercel)
4. Configure domain and SSL
5. Add analytics (Google Analytics)
6. Set up error tracking (Sentry)
7. Implement SEO optimizations
8. Create privacy policy and terms of service
9. Test across different browsers and devices
10. Plan user feedback collection system
*/