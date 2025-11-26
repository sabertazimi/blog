import { describe, expect, it } from 'vitest'
import { getLocale } from '@/i18n/utils'

describe('i18n/utils', () => {
  describe('getLocale', () => {
    it('should return the provided locale when it is valid', () => {
      expect(getLocale('en-US')).toBe('en-US')
      expect(getLocale('zh-CN')).toBe('zh-CN')
    })

    it('should return default locale when provided locale is invalid', () => {
      expect(getLocale('invalid-locale')).toBe('en-US')
      expect(getLocale('fr-FR')).toBe('en-US')
      expect(getLocale('de-DE')).toBe('en-US')
    })

    it('should return default locale when locale is undefined', () => {
      expect(getLocale(undefined)).toBe('en-US')
    })

    it('should return default locale when locale is empty string', () => {
      expect(getLocale('')).toBe('en-US')
    })
  })
})
