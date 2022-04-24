import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';

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

class MockIntersectionObserver {
  observe = jest.fn();
  takeRecords = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

window.requestAnimationFrame = function (callback) {
  return setTimeout(callback);
};

window.cancelAnimationFrame = window.clearTimeout;

jest.mock(
  'next/link',
  () =>
    ({ children }) =>
      children
);
