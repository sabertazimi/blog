import {
  cn,
  formatDate,
  getLanguageDisplayName,
  getTagUrl,
  normalizeFilepath,
  parseHighlightLines,
  parseLanguageFromClassName,
  trimTrailingNewlines,
} from './utils'

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

describe('getTagUrl', () => {
  it('should return /posts if tag is All', () => {
    expect(getTagUrl('All')).toBe('/posts')
  })

  it('should return /tag/foo if tag is foo', () => {
    expect(getTagUrl('foo')).toBe('/tag/foo')
  })

  it('should encode special characters in tag name', () => {
    expect(getTagUrl('React & Next.js')).toBe('/tag/React%20%26%20Next.js')
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

describe('trimTrailingNewlines', () => {
  it('should trim single trailing newline', () => {
    expect(trimTrailingNewlines('code\n')).toBe('code')
  })

  it('should trim multiple trailing newlines', () => {
    expect(trimTrailingNewlines('code\n\n\n')).toBe('code')
  })

  it('should not trim leading newlines', () => {
    expect(trimTrailingNewlines('\n\ncode')).toBe('\n\ncode')
  })

  it('should not trim newlines in the middle', () => {
    expect(trimTrailingNewlines('line1\nline2\nline3')).toBe('line1\nline2\nline3')
  })

  it('should handle empty string', () => {
    expect(trimTrailingNewlines('')).toBe('')
  })

  it('should handle string without newlines', () => {
    expect(trimTrailingNewlines('code')).toBe('code')
  })

  it('should handle undefined as default parameter', () => {
    expect(trimTrailingNewlines()).toBe('')
  })
})

describe('parseLanguageFromClassName', () => {
  it('should parse language from className with language- prefix', () => {
    expect(parseLanguageFromClassName('language-typescript')).toBe('typescript')
    expect(parseLanguageFromClassName('language-javascript')).toBe('javascript')
    expect(parseLanguageFromClassName('language-python')).toBe('python')
  })

  it('should return typescript as default for undefined', () => {
    expect(parseLanguageFromClassName(undefined)).toBe('typescript')
  })

  it('should return typescript as default for null', () => {
    expect(parseLanguageFromClassName(null as unknown as string)).toBe('typescript')
  })

  it('should return typescript as default for empty string', () => {
    expect(parseLanguageFromClassName('')).toBe('typescript')
  })

  it('should handle className without language- prefix', () => {
    expect(parseLanguageFromClassName('typescript')).toBe('typescript')
  })
})

describe('getLanguageDisplayName', () => {
  it('should return display name for common languages', () => {
    expect(getLanguageDisplayName('html')).toBe('HTML')
    expect(getLanguageDisplayName('css')).toBe('CSS')
    expect(getLanguageDisplayName('json')).toBe('JSON')
    expect(getLanguageDisplayName('xml')).toBe('XML')
  })

  it('should return display name for YAML variants', () => {
    expect(getLanguageDisplayName('yml')).toBe('YAML')
    expect(getLanguageDisplayName('yaml')).toBe('YAML')
  })

  it('should return display name for Markdown variants', () => {
    expect(getLanguageDisplayName('md')).toBe('Markdown')
    expect(getLanguageDisplayName('markdown')).toBe('Markdown')
  })

  it('should return display name for JavaScript variants', () => {
    expect(getLanguageDisplayName('js')).toBe('JavaScript')
    expect(getLanguageDisplayName('javascript')).toBe('JavaScript')
  })

  it('should return display name for TypeScript variants', () => {
    expect(getLanguageDisplayName('ts')).toBe('TypeScript')
    expect(getLanguageDisplayName('typescript')).toBe('TypeScript')
  })

  it('should return display name for React variants', () => {
    expect(getLanguageDisplayName('jsx')).toBe('React')
    expect(getLanguageDisplayName('tsx')).toBe('React')
  })

  it('should return display name for CoffeeScript variants', () => {
    expect(getLanguageDisplayName('coffee')).toBe('CoffeeScript')
    expect(getLanguageDisplayName('coffeescript')).toBe('CoffeeScript')
  })

  it('should return display name for Objective-C variants', () => {
    expect(getLanguageDisplayName('objc')).toBe('Objective-C')
    expect(getLanguageDisplayName('objectivec')).toBe('Objective-C')
  })

  it('should capitalize first letter for unknown languages', () => {
    expect(getLanguageDisplayName('rust')).toBe('Rust')
    expect(getLanguageDisplayName('go')).toBe('Go')
    expect(getLanguageDisplayName('python')).toBe('Python')
  })

  it('should handle single character language names', () => {
    expect(getLanguageDisplayName('c')).toBe('C')
    expect(getLanguageDisplayName('r')).toBe('R')
  })
})

describe('parseHighlightLines', () => {
  it('should parse single line number', () => {
    expect(parseHighlightLines('5')).toEqual(new Set([5]))
  })

  it('should parse comma-separated line numbers', () => {
    expect(parseHighlightLines('1,3,5')).toEqual(new Set([1, 3, 5]))
  })

  it('should parse line number ranges', () => {
    expect(parseHighlightLines('1-3')).toEqual(new Set([1, 2, 3]))
    expect(parseHighlightLines('5-8')).toEqual(new Set([5, 6, 7, 8]))
  })

  it('should parse mixed ranges and individual numbers', () => {
    expect(parseHighlightLines('1-3,5,7-9')).toEqual(new Set([1, 2, 3, 5, 7, 8, 9]))
  })

  it('should handle empty string', () => {
    expect(parseHighlightLines('')).toEqual(new Set([]))
  })

  it('should handle complex expressions', () => {
    expect(parseHighlightLines('1,3-5,10,15-17')).toEqual(new Set([1, 3, 4, 5, 10, 15, 16, 17]))
  })

  it('should deduplicate overlapping ranges', () => {
    expect(parseHighlightLines('1-5,3-7')).toEqual(new Set([1, 2, 3, 4, 5, 6, 7]))
  })
})
