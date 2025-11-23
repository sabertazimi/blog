import type { Metadata } from 'next'
import NotFoundResult from '@/components/not-found-result'
import PageHeader from '@/components/page-header'
import PostHeader from '@/components/post-header'
import PostLayout from '@/components/post-layout'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostData, getPostsData, getPostsMeta } from '@/lib/get-posts-data'
import { getMetadata } from '@/lib/seo'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const { posts } = await getPostsMeta()
  return posts.map(({ slug }) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const decodedSlug = decodeURIComponent(resolvedParams.slug)
  const postData = await getPostData(decodedSlug)
  return postData ? getMetadata({ title: postData.title }) : getMetadata()
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params
  const decodedSlug = decodeURIComponent(resolvedParams.slug)
  const buildTime = getBuildTime()
  const postsData = await getPostsData()
  const metadata = await getPostsMeta(postsData)
  const postData = await getPostData(decodedSlug, postsData)

  return (
    <DefaultLayout metadata={metadata} buildTime={buildTime}>
      <PageHeader
        title={postData?.title ?? 'Post Not Found'}
        description={postData?.description ?? 'The post you are looking for does not exist.'}
      >
        <PostHeader postData={postData} />
      </PageHeader>
      {postData ? <PostLayout post={postData} /> : <NotFoundResult />}
    </DefaultLayout>
  )
}
