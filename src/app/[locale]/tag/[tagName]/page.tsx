import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/page-header'
import PostList from '@/components/post-list'
import TagFilter from '@/components/tag-filter'
import { routing } from '@/i18n/routing'
import { getLocale } from '@/i18n/utils'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostsMeta } from '@/lib/get-posts-data'
import { getMetadata } from '@/lib/seo'

interface TagPageProps {
  params: Promise<{
    locale: string
    tagName: string
  }>
}

export async function generateStaticParams() {
  const params = []

  for (const locale of routing.locales) {
    const {
      tags: { allTags },
    } = await getPostsMeta(locale)
    params.push(...allTags.filter(tag => tag !== 'All').map(tag => ({ locale, tagName: tag })))
  }

  return params
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const { locale, tagName } = resolvedParams
  const decodedTagName = decodeURIComponent(tagName)
  const t = await getTranslations({ locale: getLocale(locale), namespace: 'metadata.posts' })

  return getMetadata({
    title: `${t('title')} - ${decodedTagName}`,
    description: t('description'),
    locale,
    pathname: `/tag/${tagName}`,
  })
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params
  const { locale, tagName } = resolvedParams
  const decodedTagName = decodeURIComponent(tagName)
  const t = await getTranslations({ locale: getLocale(locale), namespace: 'routes.posts' })
  const buildTime = getBuildTime()
  const metadata = await getPostsMeta(locale)
  const { posts, tags } = metadata

  return (
    <DefaultLayout metadata={metadata} buildTime={buildTime}>
      <PageHeader title={t('title')} description={t('description')}>
        {tags.allTags.length > 0 && <TagFilter tagsMeta={tags} selectedTag={decodedTagName} />}
      </PageHeader>
      <PostList postsMeta={posts} selectedTag={decodedTagName} />
    </DefaultLayout>
  )
}
