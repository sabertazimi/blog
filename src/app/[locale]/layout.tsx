import type { Metadata, Viewport } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Providers, SandPackCSS } from '@/app/providers'
import { routing } from '@/i18n/routing'
import { resolveLocale } from '@/i18n/utils'
import { getMetadata, getViewport } from '@/lib/seo'
import '../globals.css'

type LocaleLayoutProps = LayoutProps<'/[locale]'>

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params
  const resolvedLocale = resolveLocale(locale)
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'site' })

  return getMetadata({
    title: t('title'),
    description: t('description'),
    locale: resolvedLocale,
  })
}

export function generateViewport(): Viewport {
  return getViewport()
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
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
