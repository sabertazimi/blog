import { normalizeFilepath } from './utils'

describe('normalizeFilepath', () => {
  it('should return filename if it starts with /', () => {
    expect(normalizeFilepath('/foo.tsx')).toBe('/foo.tsx')
  })

  it('should return /filename if it does not start with /', () => {
    expect(normalizeFilepath('foo.tsx')).toBe('/foo.tsx')
  })

  it('should return /App.tsx if language is not provided', () => {
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
