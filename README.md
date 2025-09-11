# 54-Day Novena Tracker

A comprehensive Catholic prayer application for tracking and guiding through the traditional 54-Day Rosary Novena to the Blessed Virgin Mary.

## Overview

The 54-Day Novena Tracker helps Catholics complete the powerful devotion popularized by Fortuna Agrelli in 1884. The novena consists of 27 days of petition followed by 27 days of thanksgiving, with step-by-step prayer guidance through all five sets of rosary mysteries.

## Features

### Core Functionality
- **Day-by-day progress tracking** with visual progress indicators
- **Interactive prayer modal** with step-by-step rosary guidance
- **Automatic mystery rotation** through Joyful, Sorrowful, Glorious, and Luminous mysteries
- **Personal intention setting** integrated into prayer flow
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

The application will open at `http://localhost:3010` (configured in `.env`)

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
- Custom `useNovenaState` hook for centralized state management
- localStorage integration with error handling and data validation
- Computed properties for current day calculations

### Component Design
- Modular, reusable components following React best practices
- TypeScript interfaces for type safety
- Separation of concerns between UI and business logic

### Prayer System
- Step-by-step modal workflow for complete rosary guidance
- Dynamic prayer generation based on mystery type and novena phase
- Traditional Catholic prayer structure with proper sequencing

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

📧 **Email**: [tyler.woodleysolutions@gmail.com](mailto:tyler.woodleysolutions@gmail.com?subject=54-Day%20Novena%20Tracker%20Feedback)

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