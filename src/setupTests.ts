import '@testing-library/jest-dom';

// Mock localStorage globally
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Mock URL.createObjectURL and revokeObjectURL for file export tests
Object.defineProperty(window.URL, 'createObjectURL', {
  value: jest.fn(() => 'mock-blob-url')
});

Object.defineProperty(window.URL, 'revokeObjectURL', {
  value: jest.fn()
});

// Suppress console warnings in tests unless DEBUG is set
if (!process.env.DEBUG) {
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    // Only show warnings that are not React warnings about deprecated features
    const message = args[0];
    if (typeof message === 'string' && (
      message.includes('React.createFactory') ||
      message.includes('componentWillMount') ||
      message.includes('componentWillReceiveProps')
    )) {
      return;
    }
    originalConsoleWarn(...args);
  };
}

// Mock ResizeObserver if not available (common in test environments)
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver if not available
global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}));

// Mock matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});