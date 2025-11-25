import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import NotFoundResult from '@/components/not-found-result'
import PageHeader from '@/components/page-header'
import PostHeader from '@/components/post-header'
import PostLayout from '@/components/post-layout'
import { routing } from '@/i18n/routing'
import { getLocale } from '@/i18n/utils'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostData, getPostsData, getPostsMeta } from '@/lib/get-posts-data'
import { getMetadata } from '@/lib/seo'

interface PostPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
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
  const resolvedParams = await params
  const { locale, slug } = resolvedParams
  const decodedSlug = decodeURIComponent(slug)
  const postData = await getPostData(decodedSlug, getLocale(locale))

  return postData
    ? getMetadata({
        title: postData.title,
        description: postData.description,
        locale,
        pathname: `/post/${slug}`,
      })
    : getMetadata({ locale })
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params
  const { locale, slug } = resolvedParams
  const decodedSlug = decodeURIComponent(slug)
  const t = await getTranslations({ locale: getLocale(locale), namespace: 'post' })
  const buildTime = getBuildTime()
  const postsData = await getPostsData(getLocale(locale))
  const metadata = await getPostsMeta(getLocale(locale), postsData)
  const postData = await getPostData(decodedSlug, getLocale(locale), postsData)

  return (
    <DefaultLayout metadata={metadata} buildTime={buildTime}>
      <PageHeader title={postData?.title ?? t('notFound')} description={postData?.description ?? t('notFound')}>
        <PostHeader postData={postData} />
      </PageHeader>
      {postData ? <PostLayout post={postData} /> : <NotFoundResult />}
    </DefaultLayout>
  )
}
