# Testing Strategy for Journaling & History Feature

This document outlines the comprehensive testing strategy for the prayer journaling and history system implemented in the Ora prayer app.

## Overview

The testing suite covers all aspects of the journaling feature with unit tests, component tests, and integration tests to ensure reliability and maintainability.

## Test Structure

```
src/
├── __tests__/
│   └── journalIntegration.test.tsx        # End-to-end integration tests
├── components/
│   ├── journal/
│   │   └── __tests__/
│   │       ├── PrePrayerIntention.test.tsx
│   │       └── PostPrayerReflection.test.tsx
│   ├── history/
│   │   └── __tests__/
│   │       └── HistoryCard.test.tsx
│   └── screens/
│       └── __tests__/
│           └── PrayerHistoryScreen.test.tsx
└── utils/
    └── __tests__/
        └── rosaryStreak.test.ts           # Core utility functions
```

## Test Categories

### 1. Utility Function Tests (`rosaryStreak.test.ts`)

**Coverage:**
- ✅ Session creation with cloud-ready fields (UUID, timestamps, sync status)
- ✅ Journal data integration in session completion
- ✅ Data migration from legacy format
- ✅ Search and filtering functionality
- ✅ Local storage persistence
- ✅ Error handling and edge cases

**Key Test Scenarios:**
- UUID generation and uniqueness
- Device ID consistency
- Journal data preservation
- Cloud-sync preparation
- Search across all journal fields (intention, reflection, insights, gratitudes, tags)

### 2. Component Tests

#### PrePrayerIntention Component (`PrePrayerIntention.test.tsx`)

**Coverage:**
- ✅ Rendering with all mood options
- ✅ Intention text input with character limits
- ✅ Mood selection (single selection)
- ✅ Form submission with validation
- ✅ Skip functionality
- ✅ Accessibility features

**Key Features Tested:**
- 500 character limit for intentions
- Mood selection state management
- Form validation and data sanitization
- Proper ARIA labels and keyboard navigation

#### PostPrayerReflection Component (`PostPrayerReflection.test.tsx`)

**Coverage:**
- ✅ Multi-field reflection form
- ✅ Dynamic gratitude list management (max 5)
- ✅ Tag system with duplicate prevention (max 5)
- ✅ Insights input with character limits
- ✅ Mood selection after prayer
- ✅ Complex form state management

**Key Features Tested:**
- Character limits (reflection: 1000, insights: 500, gratitudes: 100, tags: 30)
- Dynamic array management (add/remove items)
- Form validation and trimming
- Scrollable container for long content

#### HistoryCard Component (`HistoryCard.test.tsx`)

**Coverage:**
- ✅ Prayer type display (Rosary, Novena, Chaplet)
- ✅ Expandable journal content
- ✅ Date formatting (Today, Yesterday, days ago)
- ✅ Duration formatting (minutes, hours)
- ✅ Visual indicators (mood emojis, badges)
- ✅ Tag overflow handling

**Key Features Tested:**
- Different prayer type styling
- Expand/collapse functionality
- Date relative formatting
- Content preview vs. full display
- Click handling for interaction

#### PrayerHistoryScreen Component (`PrayerHistoryScreen.test.tsx`)

**Coverage:**
- ✅ Statistics dashboard calculation
- ✅ Search functionality across all journal fields
- ✅ Multi-criteria filtering (type, date range)
- ✅ CSV export functionality
- ✅ Empty state handling
- ✅ Pagination and performance

**Key Features Tested:**
- Real-time search with debouncing
- Filter combinations
- Statistics accuracy (totals, percentages, monthly counts)
- Export data format and content
- Loading states and error handling

### 3. Integration Tests (`journalIntegration.test.tsx`)

**Coverage:**
- ✅ Complete prayer flow from intention to reflection
- ✅ Data persistence through entire workflow
- ✅ Different prayer types (Daily Rosary, 54-Day Novena, Chaplets)
- ✅ Skip functionality at each step
- ✅ Error handling and recovery

**Key Scenarios Tested:**
- Full journal flow: Intention → Prayer → Reflection → Completion
- 54-Day Novena exception (no intention step, existing intention preserved)
- Chaplet flow with custom journal fields
- Data validation and sanitization
- Progressive enhancement (works with/without journal data)

## Testing Philosophy

### 1. **User-Centric Testing**
Tests focus on user interactions and workflows rather than implementation details. We test what users actually do: setting intentions, reflecting on prayers, searching their history.

### 2. **Edge Case Coverage**
Comprehensive testing of boundary conditions:
- Maximum input lengths
- Empty/whitespace-only inputs
- Rapid user interactions
- Network-like failures
- Data corruption scenarios

### 3. **Accessibility Testing**
Ensures the journaling system is accessible:
- Keyboard navigation
- Screen reader compatibility
- Focus management
- ARIA labels and roles
- Proper semantic HTML

### 4. **Cloud-Ready Testing**
Prepares for future cloud sync:
- UUID generation and validation
- Timestamp consistency
- Sync status management
- Data migration scenarios
- Conflict resolution preparation

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Suites
```bash
# Utility tests only
npm test rosaryStreak.test.ts

# Component tests only
npm test -- --testPathPattern=components

# Integration tests only
npm test journalIntegration.test.tsx
```

### Run Tests with Coverage
```bash
npm test -- --coverage --watchAll=false
```

### Debug Tests
```bash
DEBUG=1 npm test
```

## Mock Strategy

### 1. **External Dependencies**
- localStorage: Fully mocked with consistent behavior
- Date/Time: Controllable mocking for consistent test results
- File APIs: Mocked for CSV export testing
- Audio/Visual APIs: Mocked for performance

### 2. **Internal Dependencies**
- Constants: Minimal mocking, prefer real data
- Utilities: Mock only when necessary for isolation
- Components: Strategic mocking for integration tests

### 3. **Data Mocking**
- Realistic prayer session data
- Edge cases (empty data, maximum lengths)
- Different prayer types and configurations
- Journal data variations

## Test Data Patterns

### Sample Prayer Session
```typescript
const mockSession: RosarySession = {
  id: 'uuid-v4-format',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:30:00Z',
  date: '2024-01-15',
  prayerType: 'daily-rosary',
  mystery: 'Joyful',
  completed: true,
  duration: 20,
  intention: 'For family healing',
  reflection: 'Peaceful prayer time',
  mood: 'peaceful',
  gratitudes: ['Health', 'Family'],
  insights: 'God is present',
  tags: ['healing', 'peace']
};
```

## Coverage Goals

- **Utility Functions**: 100% line and branch coverage
- **Components**: 95%+ coverage focusing on user interactions
- **Integration**: All critical user paths tested
- **Error Handling**: All error conditions covered

## Continuous Integration

Tests are designed to be:
- **Fast**: Complete suite runs in under 30 seconds
- **Reliable**: No flaky tests, consistent results
- **Informative**: Clear failure messages with actionable information
- **Maintainable**: Easy to update when requirements change

## Future Testing Considerations

### 1. **Cloud Sync Testing**
When cloud sync is implemented:
- Network failure scenarios
- Conflict resolution logic
- Data synchronization accuracy
- Offline-first behavior

### 2. **Performance Testing**
For large prayer histories:
- Search performance with thousands of entries
- Memory usage with extensive journal data
- Export performance with large datasets

### 3. **Cross-Platform Testing**
- PWA behavior on different devices
- Touch vs. mouse interactions
- Different screen sizes and orientations

## Best Practices

### 1. **Test Organization**
- Group related tests with `describe` blocks
- Use descriptive test names explaining the scenario
- Follow AAA pattern: Arrange, Act, Assert

### 2. **Mock Management**
- Reset mocks between tests
- Use `beforeEach` for consistent setup
- Prefer minimal mocking for better confidence

### 3. **Assertions**
- Test user-visible behavior, not implementation
- Use specific matchers (`toHaveTextContent` vs `toBeTruthy`)
- Include negative assertions when appropriate

### 4. **Maintenance**
- Update tests when requirements change
- Remove obsolete tests promptly
- Refactor test utilities to reduce duplication

This comprehensive testing strategy ensures the journaling and history feature is robust, user-friendly, and ready for future enhancements including cloud synchronization.