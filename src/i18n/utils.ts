import type { Locale } from 'next-intl'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'

export function getLocale(locale?: string): Locale {
  return hasLocale(routing.locales, locale) ? locale : routing.defaultLocale
}
