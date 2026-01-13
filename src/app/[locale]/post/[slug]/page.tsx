import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { NotFoundResult } from '@/components/not-found-result'
import { PageHeader } from '@/components/page-header'
import { PostHeader } from '@/components/post-header'
import { PostLayout } from '@/components/post-layout'
import { routing } from '@/i18n/routing'
import { resolveLocale } from '@/i18n/utils'
import { DefaultLayout } from '@/layouts/default-layout'
import { getBuildTime } from '@/lib/get-build-time'
import { getPostData, getPostsData, getPostsMeta } from '@/lib/get-posts-data'
import { getMetadata } from '@/lib/seo'

interface PostPageProps {
  params: Promise<{ locale: string, slug: string }>
}

export async function generateStaticParams() {
  const params = []

  for (const locale of routing.locales) {
    const { posts } = await getPostsMeta(locale)
    params.push(...posts.map(({ slug }) => ({ locale, slug })))
  }

  return params
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const resolvedLocale = resolveLocale(locale)
  const postData = await getPostData(decodedSlug, resolvedLocale)

  return postData
    ? getMetadata({
        title: postData.title,
        description: postData.description,
        locale: resolvedLocale,
        pathname: `/post/${slug}`,
      })
    : getMetadata({ locale: resolvedLocale })
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const resolvedLocale = resolveLocale(locale)
  setRequestLocale(resolvedLocale)
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'post' })
  const buildTime = getBuildTime()
  const postsData = await getPostsData(resolvedLocale)
  const metadata = await getPostsMeta(resolvedLocale, postsData)
  const postData = await getPostData(decodedSlug, resolvedLocale, postsData)

  return (
    <DefaultLayout metadata={metadata} buildTime={buildTime}>
      <PageHeader title={postData?.title ?? t('notFound')} description={postData?.description ?? t('notFound')}>
        <PostHeader postData={postData} locale={resolvedLocale} />
      </PageHeader>
      {postData ? <PostLayout post={postData} /> : <NotFoundResult />}
    </DefaultLayout>
  )
}
