import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { AboutMe } from '@/components/about-me'
import { PageHeader } from '@/components/page-header'
import { resolveLocale } from '@/i18n/utils'
import { DefaultLayout } from '@/layouts/default-layout'
import { getBuildTime } from '@/lib/get-build-time'
import { getGitHubData } from '@/lib/get-github-data'
import { getPostsMeta } from '@/lib/get-posts-data'
import { getMetadata } from '@/lib/seo'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params
  const resolvedLocale = resolveLocale(locale)
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'metadata.about' })

  return getMetadata({
    title: t('title'),
    description: t('description'),
    locale: resolvedLocale,
    pathname: '/about',
  })
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const resolvedLocale = resolveLocale(locale)
  setRequestLocale(resolvedLocale)
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'routes.about' })
  const buildTime = getBuildTime()
  const metadata = await getPostsMeta(resolvedLocale)
  const { profile, repos } = await getGitHubData()

  return (
    <DefaultLayout metadata={metadata} buildTime={buildTime}>
      <PageHeader title={t('title')} description={t('description')} />
      <AboutMe profile={profile} repos={repos} />
    </DefaultLayout>
  )
}
