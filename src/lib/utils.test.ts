import { cn, formatDate, getTagUrl, normalizeFilepath } from './utils'

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('should handle conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('should merge Tailwind classes correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })
})

describe('formatDate', () => {
  it('should format Date object', () => {
    const date = new Date('2025-01-15T10:30:00')
    expect(formatDate(date)).toMatch(/2025-01-15/)
    expect(formatDate(date, true)).toMatch(/2025-01-15 \d{2}:\d{2}/)
  })

  it('should format date string', () => {
    expect(formatDate('2025-01-15T10:30:00')).toMatch(/2025-01-15/)
    expect(formatDate('2025-01-15T10:30:00', true)).toMatch(/2025-01-15 \d{2}:\d{2}/)
  })

  it('should format timestamp number', () => {
    expect(formatDate(1705315800000)).toMatch(/\d{4}-\d{2}-\d{2}/)
    expect(formatDate(1705315800000, true)).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/)
  })

  it('should handle undefined and return current date', () => {
    expect(formatDate(undefined)).toMatch(/\d{4}-\d{2}-\d{2}/)
    expect(formatDate(undefined, true)).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/)
  })

  it('should handle null and return current date', () => {
    expect(formatDate(null)).toMatch(/\d{4}-\d{2}-\d{2}/)
    expect(formatDate(null, true)).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/)
  })

  it('should handle empty string and return current date', () => {
    expect(formatDate('')).toMatch(/\d{4}-\d{2}-\d{2}/)
    expect(formatDate('', true)).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/)
  })
})

describe('normalizeFilepath', () => {
  it('should return filename if it starts with /', () => {
    expect(normalizeFilepath('/foo.tsx')).toBe('/foo.tsx')
  })

  it('should return /filename if it does not start with /', () => {
    expect(normalizeFilepath('foo.tsx')).toBe('/foo.tsx')
  })

  it('should return /App.tsx if language is not provided', () => {
    expect(normalizeFilepath(undefined, undefined)).toBe('/App.tsx')
    expect(normalizeFilepath('', '')).toBe('/App.tsx')
  })

  it('should return /styles.css if language is css', () => {
    expect(normalizeFilepath('', 'css')).toBe('/styles.css')
  })

  it('should return /App.js if language is js', () => {
    expect(normalizeFilepath('', 'js')).toBe('/App.js')
    expect(normalizeFilepath('', 'javascript')).toBe('/App.js')
  })

  it('should return /App.ts if language is ts', () => {
    expect(normalizeFilepath('', 'ts')).toBe('/App.ts')
    expect(normalizeFilepath('', 'typescript')).toBe('/App.ts')
  })

  it('should return /App.jsx if language is jsx', () => {
    expect(normalizeFilepath('', 'jsx')).toBe('/App.jsx')
  })

  it('should return /App.tsx if language is tsx', () => {
    expect(normalizeFilepath('', 'tsx')).toBe('/App.tsx')
  })

  it('should return /src/App.vue if language is vue', () => {
    expect(normalizeFilepath('', 'vue')).toBe('/src/App.vue')
  })
})

describe('getTagUrl', () => {
  it('should return /posts if tag is All', () => {
    expect(getTagUrl('All')).toBe('/posts')
  })

  it('should return /tag/foo if tag is foo', () => {
    expect(getTagUrl('foo')).toBe('/tag/foo')
  })
})
