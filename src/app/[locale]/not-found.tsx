import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import NotFoundResult from '@/components/not-found-result'
import PageHeader from '@/components/page-header'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostsMeta } from '@/lib/get-posts-data'
import { getMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'metadata.notFound' })

  return getMetadata({
    title: t('title'),
    description: t('description'),
    locale,
  })
}

export default async function NotFoundPage() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'notFound' })
  const buildTime = getBuildTime()
  const metadata = await getPostsMeta(locale)

  return (
    <DefaultLayout metadata={metadata} buildTime={buildTime}>
      <PageHeader title={t('title')} description={t('description')} />
      <NotFoundResult />
    </DefaultLayout>
  )
}
