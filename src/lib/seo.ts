import type { Metadata, Viewport } from 'next'
import type { Locale } from 'next-intl'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { siteConfig } from '@/lib/site'

export function getMetadata({
  title,
  description,
  author = siteConfig.author,
  url = siteConfig.url,
  x = siteConfig.socials.x,
  locale,
  pathname = '',
}: {
  title?: string
  description?: string
  author?: string
  url?: string
  x?: string
  locale?: Locale
  pathname?: string
} = {}): Metadata {
  // Generate alternate language links
  const languages: Record<string, string> = {}
  const isLocale = hasLocale(routing.locales, locale)

  if (isLocale) {
    routing.locales.forEach((loc) => {
      languages[loc] = `${url}/${loc}${pathname}`
    })
  }

  return {
    title,
    description,
    applicationName: title,
    creator: author,
    icons: {
      icon: '/favicon.ico',
    },
    manifest: '/manifest.json',
    alternates: isLocale
      ? {
          canonical: url,
          languages,
        }
      : undefined,
    openGraph: {
      url,
      title,
      description,
      siteName: title,
      locale,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'index': true,
        'follow': true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      card: 'summary_large_image',
      site: `@${x}`,
      siteId: `@${x}`,
    },
  }
}

export function getViewport({
  themeColor = siteConfig.themeColor,
  width = 'device-width',
  initialScale = 1.0,
}: {
  themeColor?: string
  width?: string
  initialScale?: number
} = {}): Viewport {
  return {
    themeColor,
    width,
    initialScale,
  }
}
