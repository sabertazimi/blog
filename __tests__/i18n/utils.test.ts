import { describe, expect, it } from 'vitest'
import { resolveLocale } from '@/i18n/utils'

describe('i18n/utils', () => {
  describe('resolveLocale', () => {
    it('should return the provided locale when it is valid', () => {
      expect(resolveLocale('en-US')).toBe('en-US')
      expect(resolveLocale('zh-CN')).toBe('zh-CN')
    })

    it('should return default locale when provided locale is invalid', () => {
      expect(resolveLocale('invalid-locale')).toBe('en-US')
      expect(resolveLocale('fr-FR')).toBe('en-US')
      expect(resolveLocale('de-DE')).toBe('en-US')
    })

    it('should return default locale when locale is undefined', () => {
      expect(resolveLocale(undefined)).toBe('en-US')
    })

    it('should return default locale when locale is empty string', () => {
      expect(resolveLocale('')).toBe('en-US')
    })
  })
})
