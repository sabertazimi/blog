// Extend `expect` matchers.
import '@testing-library/jest-dom'
import 'jest-axe/extend-expect'

// Mock `window.matchMedia`.
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
})

// Mock `window.IntersectionObserver`
class MockIntersectionObserver {
  observe = jest.fn()
  takeRecords = jest.fn()
  disconnect = jest.fn()
  unobserve = jest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

// Mock window animation frame.
window.requestAnimationFrame = function (callback) {
  return setTimeout(callback)
}

window.cancelAnimationFrame = window.clearTimeout

// Mock React portal.
function mockCreatePortal(element, target) {
  return (
    <div>
      <div id="content">{element}</div>
      <div id="target" data-target-tag-name={target.tagName}></div>
    </div>
  )
}

jest.mock('react-dom', () => {
  const reactDom = jest.requireActual('react-dom')
  reactDom.createPortal = mockCreatePortal
  return reactDom
})

// Disable ant design hashed CSS-in-JS class name.
jest.mock('antd', () => {
  const antd = jest.requireActual('antd')
  antd.theme.defaultConfig.hashed = false
  return antd
})
