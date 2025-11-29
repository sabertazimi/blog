import type { Metadata, Viewport } from 'next'
import type { Locale } from 'next-intl'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Providers, SandPackCSS } from '@/app/providers'
import { routing } from '@/i18n/routing'
import { getMetadata, getViewport } from '@/lib/seo'
import '../globals.css'

interface MetadataProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'site' })

  return getMetadata({
    title: t('title'),
    description: t('description'),
    locale,
  })
}

export function generateViewport(): Viewport {
  return getViewport()
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

interface LocaleLayoutProps {
  params: Promise<{ locale: Locale }>
  children: React.ReactNode
}

export default async function LocaleLayout({ params, children }: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <SandPackCSS />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
