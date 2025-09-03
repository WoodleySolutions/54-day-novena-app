# 54-Day Novena App - Development Strategy

## Current Status
- **Web App**: Live at 54dayrosary.com
- **Android**: In Google Play Store closed testing
- **TWA Status**: Working correctly (browser UI hidden)
- **Testing Phase**: Need 12 testers for 14 days before production release

## Core App Features (Implemented)
- 54-day novena tracking (petition + thanksgiving phases)
- Daily prayer guidance with expandable sections
- Intention setting and storage
- Progress tracking with localStorage persistence
- Optional daily reminder notifications
- Data reset functionality
- Offline PWA capabilities
- Ko-fi donation integration

## Monetization Strategy
- **Current**: Free app with optional Ko-fi donations
- **Future**: Freemium model considerations
  - Premium features: Custom prayers, advanced analytics, cloud sync
  - Keep core novena functionality always free

## Play Store Testing Strategy

### Update Deployment Process
1. **Web Updates** (instant for users):
   - Feature development → `npm run build` → `git push` → Netlify deploy
   - Users get updates immediately in Android app (TWA advantage)

2. **Play Store Updates** (for Google's visibility):
   - Increment version in `public/manifest.json` 
   - Run `bubblewrap update` to sync changes
   - `bubblewrap build` new .aab file
   - Upload to Play Console with release notes
   - Target: Weekly uploads during testing period

### Version Management
- **Web Version**: Semantic versioning in package.json
- **Android Version**: Match web version in manifest.json
- **Version Code**: Auto-increment for each Play Store upload

## Planned Features for Testing Period

### Phase 1: User Experience Enhancements
- [ ] Prayer customization options
- [ ] Multiple novena types (Sacred Heart, Divine Mercy)
- [ ] Dark mode toggle
- [ ] Font size adjustments
- [ ] Prayer history/journal

### Phase 2: Engagement Features
- [ ] Streak tracking
- [ ] Achievement system
- [ ] Community prayer intentions (anonymous)
- [ ] Saint of the day integration

### Phase 3: Premium Features (Post-Launch)
- [ ] Cloud sync across devices
- [ ] Custom prayer additions
- [ ] Advanced analytics
- [ ] Prayer reminders with custom times
- [ ] Offline prayer audio

## Technical Considerations

### TWA vs Native App
- **Advantages**: Instant updates, single codebase, web functionality
- **Limitations**: Limited to web APIs, dependent on browser engine
- **Decision**: Continue TWA approach for rapid iteration

### Data Storage
- **Current**: localStorage for client-side persistence
- **Future**: Consider Firebase/Supabase for cloud sync premium feature

### Analytics
- **Current**: Google Analytics (production only)
- **Future**: User engagement metrics, prayer completion rates

## Go-to-Market Strategy

### Pre-Launch (Testing Phase)
- Gather feedback from closed testers
- Refine core user experience
- Build email list through Ko-fi/website
- Document user testimonials

### Launch
- Production release on Google Play Store
- Promotional post on r/Catholic communities
- Share with parish networks
- Social media promotion (#Catholic #Rosary #Prayer)

### Post-Launch
- iOS version consideration (PWA installable on iOS)
- Feature requests from user feedback
- Premium tier development
- Partnership with Catholic organizations

## Key Metrics to Track
- Daily active users
- Novena completion rates
- Prayer modal engagement
- Donation conversion rates
- App store ratings and reviews

## Development Principles
- Keep core functionality always free
- Maintain focus on prayer and devotion
- Prioritize simplicity and ease of use
- Respect Catholic traditions and teachings
- Ensure offline functionality

## Next Steps
1. Complete closed testing requirements (12 testers, 14 days)
2. Implement Phase 1 features during testing
3. Regular .aab uploads with release notes
4. Prepare production launch materials
5. Plan post-launch feature roadmap

---
*Last updated: 2025-09-03*