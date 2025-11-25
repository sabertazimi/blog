import type { Metadata, Viewport } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Providers, SandPackCSS } from '@/app/providers'
import { routing } from '@/i18n/routing'
import { getLocale } from '@/i18n/utils'
import { getMetadata, getViewport } from '@/lib/seo'
import '../globals.css'

interface MetadataProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale: getLocale(locale), namespace: 'site' })

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

interface Props {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
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
