import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import PageHeader from '@/components/page-header'
import PostList from '@/components/post-list'
import TagFilter from '@/components/tag-filter'
import { resolveLocale } from '@/i18n/utils'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostsMeta } from '@/lib/get-posts-data'
import { getMetadata } from '@/lib/seo'

interface PostsPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PostsPageProps): Promise<Metadata> {
  const { locale } = await params
  const resolvedLocale = resolveLocale(locale)
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'metadata.posts' })

  return getMetadata({
    title: t('title'),
    description: t('description'),
    locale: resolvedLocale,
    pathname: '/posts',
  })
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { locale } = await params
  const resolvedLocale = resolveLocale(locale)
  setRequestLocale(resolvedLocale)
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'routes.posts' })
  const buildTime = getBuildTime()
  const metadata = await getPostsMeta(resolvedLocale)
  const { posts, tags } = metadata

  return (
    <DefaultLayout metadata={metadata} buildTime={buildTime}>
      <PageHeader title={t('title')} description={t('description')}>
        {tags.allTags.length > 0 && <TagFilter tagsMeta={tags} selectedTag="All" />}
      </PageHeader>
      <PostList postsMeta={posts} selectedTag="All" />
    </DefaultLayout>
  )
}
