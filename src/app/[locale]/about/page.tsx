import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import AboutMe from '@/components/about-me'
import PageHeader from '@/components/page-header'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import getGitHubData from '@/lib/get-github-data'
import { getPostsMeta } from '@/lib/get-posts-data'
import { getMetadata } from '@/lib/seo'

interface AboutPageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.about' })

  return getMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    pathname: '/about',
  })
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'routes.about' })
  const buildTime = getBuildTime()
  const metadata = await getPostsMeta(locale)
  const { profile, repos } = await getGitHubData()

  return (
    <DefaultLayout metadata={metadata} buildTime={buildTime}>
      <PageHeader title={t('title')} description={t('description')} />
      <AboutMe profile={profile} repos={repos} />
    </DefaultLayout>
  )
}
