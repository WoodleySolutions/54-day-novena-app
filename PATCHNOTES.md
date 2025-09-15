# Ora: Rosary & Devotion Tracker - Patch Notes

## Version 0.4.0 - Prayer Journal & Novena Enhancements
*Released: September 2025*

### 📖 Major New Features

#### Prayer Journal System
- **Pre-Prayer Intentions**: Set meaningful intentions before beginning prayers
- **Post-Prayer Reflections**: Capture thoughts, insights, and spiritual experiences
- **Mood Tracking**: Record emotional state after prayer sessions
- **Gratitude Lists**: Maintain lists of what you're thankful for
- **Spiritual Insights**: Document inspirations and messages received
- **Prayer Tags**: Organize prayers with custom tags for easy searching

#### Enhanced Prayer History
- **Complete History Screen**: View all past prayer sessions with comprehensive details
- **Advanced Search**: Find specific prayers, reflections, or sessions by keywords
- **Session Cards**: Beautiful cards showing prayer type, date, intentions, and reflections
- **Sorting Options**: Organize by most recent or search results

#### Novena System Improvements
- **Traditional Novena Support**: Added support for individual 9-day novenas alongside 54-day novena
- **Multiple Active Novenas**: Track several novenas simultaneously
- **Novena Information System**: Educational modals explaining traditional novena practices
- **Enhanced Progress Tracking**: Visual indicators for each day of novena progress

### 🐛 Critical Bug Fixes
- **Novena Info Button**: Fixed non-functional info button to properly display novena education
- **Three-Dot Menu**: Fixed unresponsive options menu on novena tiles
- **Theological Correction**: Changed "Patron Saint" to "Patron" for appropriate terminology
- **Intention Loop Fix**: Resolved critical bug causing endless intention setting screens
- **Double Scrollbar Fix**: Eliminated confusing nested scrollbars in reflection modals

### 🎨 User Experience Enhancements
- **Seamless Integration**: Prayer journal works smoothly with existing prayer flows
- **Intuitive Interface**: Clean, organized design for setting intentions and reflections
- **Educational Content**: Authentic Catholic content explaining traditional novena practices
- **Improved Navigation**: Better organized information panels and settings

### 🔧 Technical Improvements
- **Enhanced Type System**: Extended prayer session types for intentions and reflections
- **New Components**: PrePrayerIntention, PostPrayerReflection, PrayerHistoryScreen
- **Testing Infrastructure**: Comprehensive unit tests for all new components
- **Improved Performance**: Optimized rendering and data persistence

---

## Version 0.3.0 - Virtual Rosary & Enhanced Prayer Experience
*Released: September 2025*

### ✨ New Features

#### Virtual Rosary
- **Interactive Rosary Beads**: Visual rosary with clickable beads for prayer progression
- **Mystery-Based Layout**: Different bead patterns for Joyful, Sorrowful, Glorious, and Luminous mysteries
- **Prayer Guidance**: Step-by-step visual guidance through each prayer
- **Drawer Interface**: Collapsible rosary drawer that doesn't interfere with prayer text

#### Enhanced Prayer Experience
- **Audio Feedback**: Optional sound effects for prayer progression and completion
- **Expandable Prayers**: Traditional prayers (Our Father, Hail Mary, etc.) in collapsible format
- **Prayer Info Modals**: Educational content about rosary, chaplets, and novenas
- **Improved Settings**: Comprehensive settings for audio, display, and prayer preferences

### 🔧 Technical Improvements
- **Audio System**: WebAudio API integration with user preference controls
- **Component Architecture**: Modular prayer components for better maintainability
- **Performance Optimization**: Reduced bundle size and improved loading times

---

## Version 0.2.0 - Dark Mode & Screen Wake Lock
*Testing Phase Release - September 2025*

### ✨ New Features

#### Keep Screen Awake During Prayer
- Added "Keep Screen Awake" toggle in Settings → Prayer Experience
- Prevents screen from dimming while prayer modal is open
- Automatically enabled by default for better prayer experience
- Works on Android Chrome, TWA, and desktop browsers
- Intelligently hidden on iOS Safari where unsupported
- Screen wake lock automatically releases when prayer completes

#### Dark Mode Support
- Added comprehensive dark mode toggle in Settings → Appearance
- Three options: Light, Dark, and Auto (follows system preference)
- Smooth transitions between themes
- System preference detection and automatic switching
- Persistent theme selection across sessions
- Full UI coverage including modals, cards, and text

### 🔧 Technical Improvements
- Enhanced Screen Wake Lock API integration
- Improved iOS Safari compatibility detection
- Better user experience with platform-appropriate feature availability
- Fixed dark mode body background (no more white sidebar)
- Improved dark mode text contrast for better readability
- Enhanced color schemes for better dark mode visibility
- Lighter purple/indigo colors in dark mode for better contrast

### 🐛 Bug Fixes
- **Comprehensive dark mode styling**: Complete Settings modal dark mode consistency with proper text contrast and icon visibility
- **Time input clock icon visibility**: Fixed dark mode time selector with proper color scheme override
- **Optimized mobile experience**: Hidden non-functional notification features on mobile/TWA
- **Cleaned up codebase**: Removed debugging code and optimized bundle size (-4KB)
- **Desktop notifications work reliably**: Maintained notification functionality for desktop browsers

### 📱 Mobile Improvements  
- **TWA/Mobile notification handling**: Gracefully hidden notification features that don't work on mobile
- **User-friendly messaging**: Added polished "Coming Soon" message without technical jargon
- **Focused mobile experience**: Removed debugging buttons and technical alerts that cluttered mobile interface

### 🌙 Dark Mode Polish
- **Settings modal consistency**: All text, icons, borders, and components properly themed for dark mode
- **Enhanced readability**: Proper contrast ratios for all text elements in dark mode
- **Interactive element theming**: Toggle switches, buttons, and form controls with dark mode variants
- **Icon visibility improvements**: All icons now visible and properly contrasted in dark mode

---

## Version 0.1.0 - Initial Release
*Released: August 2025*

### ✨ Core Features
- 54-day novena tracking (petition + thanksgiving phases)
- Daily prayer guidance with step-by-step flow
- Intention setting and persistence
- Progress tracking with visual indicators
- Optional push notification reminders
- Offline Progressive Web App support
- Data reset functionality
- Ko-fi donation integration

### 📱 Platform Support
- Web app at 54dayrosary.com
- Android app via Google Play Store (TWA)
- Full offline functionality
- Cross-platform data persistence

### 🎨 User Interface
- Clean, prayer-focused design
- Expandable traditional prayers
- Settings modal with comprehensive options
- Responsive mobile-first layout
- Intuitive navigation and progress tracking

---

*For technical details and development strategy, see [STRATEGY.md](STRATEGY.md)*