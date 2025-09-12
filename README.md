# Ora: Rosary & Devotion Tracker

Ora is a beautiful Catholic prayer companion for the rosary, chaplets, and the 54-Day Novena to Our Lady. Track your spiritual journey with guided prayers and devotions.

## Overview

Ora serves as a complete digital prayer guide for Catholics, featuring multiple prayer experiences:

1. **54-Day Novena Tracker** - The powerful devotion popularized by Fortuna Agrelli in 1884, consisting of 27 days of petition followed by 27 days of thanksgiving
2. **Daily Rosary** - Flexible daily rosary prayers with user-selectable mysteries including Joyful, Sorrowful, Glorious, and Luminous mysteries, plus streak tracking
3. **Traditional Chaplets** - Divine Mercy, St. Michael, Sacred Heart, and Seven Sorrows chaplets with guided meditations

## Features

### 54-Day Novena Features
- **Day-by-day progress tracking** with visual progress indicators through 54 days
- **Two-phase structure** - 27 days of petition followed by 27 days of thanksgiving
- **Automatic mystery rotation** through Joyful, Sorrowful, and Glorious mysteries (traditional novena cycle)
- **Personal intention setting** integrated into prayer flow
- **Phase-specific analytics** showing petition vs thanksgiving progress

### Daily Rosary Features
- **Mystery selection** - Choose from Joyful, Sorrowful, Glorious, or Luminous mysteries
- **Streak tracking** - Monitor consecutive days of prayer with statistics
- **Flexible prayer schedule** - Pray any mystery at any time
- **Traditional day suggestions** - Recommended mysteries for each day of the week
- **Prayer session history** - Track all completed rosary sessions

### Shared Features
- **Interactive prayer modal** with step-by-step rosary guidance
- **Traditional meditation reflections** for each mystery
- **Enhanced decade headers** showing specific mystery names
- **Data persistence** across browser sessions using localStorage
- **Free trial system** with premium subscription features
- **Dark mode support** with automatic theme detection

### Prayer Experience
- Complete rosary structure from opening prayers to closing prayers
- Individual decade guidance with mystery meditation
- Traditional Catholic prayers including Hail Holy Queen and Rosary Prayer
- Phase-specific closing prayers adapted for petition vs thanksgiving periods
- Consolidated prayer steps for smooth workflow

### Educational Content
- Historical context about the 54-Day Novena tradition
- Information about Fortuna Agrelli and the devotion's origins
- Learn More modal accessible from the header

### Technical Features
- **Responsive design** built with React and Tailwind CSS
- **TypeScript** for type safety and better development experience
- **Modular architecture** with custom hooks and reusable components
- **SEO optimized** with comprehensive meta tags and Open Graph support
- **Progressive Web App (PWA)** with offline functionality and app installation
- **Push notifications** for daily prayer reminders
- **Google Analytics 4** integration with privacy-focused tracking
- **Environment-based configuration** for secure API key management

## Live Application

Visit the live application at: **https://54dayrosary.com**

### Mobile App Features
- **Install as PWA**: Add to home screen on mobile devices for native app experience
- **Offline functionality**: Works without internet connection once cached
- **Push notifications**: Daily prayer reminders (requires permission)
- **Android App Store**: Coming soon via Google Play Store

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/WoodleySolutions/54-day-novena-app.git
cd 54-day-novena-app
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (optional):
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local and add your Google Analytics tracking ID
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3011` (configured in `.env`)

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_GA_TRACKING_ID` | Google Analytics 4 tracking ID | No |

**Note**: Analytics are disabled if no tracking ID is provided. The app functions fully without analytics.

## Available Scripts

### `npm start`
Runs the app in development mode at http://localhost:3000

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder with optimized performance

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App setup

### `npm run start:fresh`
Clears the cache and starts the development server (useful for troubleshooting)

### `npm run clear-cache`
Manually clears the React build cache

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Header, Footer, etc.)
│   ├── modals/         # Modal components (Prayer, Settings, Paywall, etc.)
│   ├── screens/        # Main screen components (PrayerSelection, NovenaTracking)
│   ├── pages/          # Page components (Payment success, etc.)
│   └── NovenaTracker/  # Core tracker components
├── contexts/           # React context providers (Theme, Subscription)
├── hooks/              # Custom React hooks (useNovenaState, useTrialState)
├── services/           # External service integrations (Stripe)
├── utils/              # Utility functions and helpers
├── config/             # Configuration files
├── types/              # TypeScript type definitions
└── constants/          # Application constants
```

## Architecture Highlights

### State Management
- Custom `useNovenaState` hook for 54-day novena tracking
- Dedicated rosary streak tracking system with localStorage persistence
- Dual navigation system supporting both prayer types
- Computed properties for current day calculations and streak analysis

### Component Design
- Modular, reusable components following React best practices
- TypeScript interfaces for type safety across dual prayer systems
- Separation of concerns between UI and business logic
- Screen-based architecture with PrayerSelectionScreen as main hub

### Prayer System
- Unified prayer modal supporting both novena and daily rosary
- Dynamic prayer generation based on mystery type and prayer context
- Traditional Catholic prayer structure with enhanced mystery reflections
- Streak tracking and session management for daily rosary prayers

## Deployment

The application is deployed on Netlify with:
- Custom domain (54dayrosary.com)
- HTTPS/SSL certification
- Optimized build artifacts
- Social media sharing support

## Technical Specifications

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Hosting**: Netlify
- **Domain**: 54dayrosary.com

## Feedback and Support

Have feedback, suggestions, or need support? We'd love to hear from you!

📧 **Email**: [tyler.woodleysolutions@gmail.com](mailto:tyler.woodleysolutions@gmail.com?subject=Ora%20Feedback)

You can also use the "Contact us" link in the app footer for quick feedback.

## Contributing

This is a faith-based project developed by Woodley Solutions. Traditional prayers are in the public domain.

### Development Workflow
- **CI/CD**: Automated testing and deployment via GitHub Actions
- **Dependencies**: Automated updates via Dependabot
- **Issues**: Use GitHub issue templates for bug reports and feature requests

## License

© 2025 Woodley Solutions. All rights reserved.
Traditional prayers are in the public domain.

---

*Developed with devotion by [Woodley Solutions](https://www.woodleysolutions.dev)*