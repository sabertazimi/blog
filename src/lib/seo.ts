import type { Metadata, Viewport } from 'next'
import { siteConfig } from './site'

export function getMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  author = siteConfig.author,
  siteUrl = siteConfig.siteUrl,
  x = siteConfig.socials.x,
}: {
  title?: string
  description?: string
  author?: string
  siteUrl?: string
  x?: string
} = {}): Metadata {
  return {
    title,
    description,
    applicationName: title,
    creator: author,
    icons: {
      icon: '/favicon.ico',
      apple: {
        url: '/images/logo-full.png',
        sizes: '200x200',
        type: 'image/png',
      },
    },
    manifest: '/manifest.json',
    openGraph: {
      url: siteUrl,
      title,
      description,
      siteName: title,
    },
    robots: {
      'nosnippet': true,
      'notranslate': true,
      'noimageindex': true,
      'noarchive': true,
      'max-snippet': -1,
      'max-image-preview': 'none',
      'max-video-preview': -1,
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
