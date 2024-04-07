import { afterEach, expect } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})

// Mock `window.matchMedia`.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock `window.IntersectionObserver`
class MockIntersectionObserver {
  observe = vi.fn()
  takeRecords = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

Object.defineProperty(globalThis, 'IntersectionObserver', {
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
function mockCreatePortal(element: JSX.Element, target: Element) {
  return (
    <div>
      <div id="content">{element}</div>
      <div id="target" data-target-tag-name={target.tagName}></div>
    </div>
  )
}

vi.mock('react-dom', async (importOriginal) => {
  return {
    ...await importOriginal<typeof import('react-dom')>(),
    createPortal: mockCreatePortal,
  }
})

// Disable ant design hashed CSS-in-JS class name.
vi.mock('antd', async (importOriginal) => {
  return {
    ...await importOriginal<typeof import('antd')>(),
    theme: {
      defaultConfig: {
        hashed: false,
      },
    },
  }
})
