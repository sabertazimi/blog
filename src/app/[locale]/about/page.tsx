import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutMe from '@/components/about-me'
import PageHeader from '@/components/page-header'
import { getLocale } from '@/i18n/utils'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import getGitHubData from '@/lib/get-github-data'
import { getPostsMeta } from '@/lib/get-posts-data'
import { getMetadata } from '@/lib/seo'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale: getLocale(locale), namespace: 'metadata.about' })

  return getMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    pathname: '/about',
  })
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale: getLocale(locale), namespace: 'routes.about' })
  const buildTime = getBuildTime()
  const metadata = await getPostsMeta(getLocale(locale))
  const { profile, repos } = await getGitHubData()
  const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0)

  return (
    <DefaultLayout metadata={metadata} buildTime={buildTime}>
      <PageHeader title={t('title')} description={t('description')} />
      <AboutMe profile={profile} repos={repos} totalStars={totalStars} />
    </DefaultLayout>
  )
}
