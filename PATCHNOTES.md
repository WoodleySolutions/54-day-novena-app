# 54-Day Novena App - Patch Notes

## Version 0.2.0 (In Development)
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
- **Fixed notification system not working**: Improved scheduling and initialization
- **Fixed reminder time not persisting**: Now saves and loads time preference from localStorage
- **Enhanced notification reliability**: Better service worker integration and fallback systems
- **Added test notification feature**: Users can verify notifications are working
- **Fixed dark mode styling**: Time input and notification controls now properly themed

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