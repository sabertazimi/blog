import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import NotFoundResult from '@/components/not-found-result'
import PageHeader from '@/components/page-header'
import PostContent from '@/components/post-content'
import PostMetadata from '@/components/post-metadata'
import { Button } from '@/components/ui/button'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostData, getPostsData, getPostsMeta } from '@/lib/get-posts-data'
import { getMetadata } from '@/lib/seo'
import { formatDate } from '@/lib/utils'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const postsMeta = await getPostsMeta()
  return postsMeta.map(({ slug }) => ({
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
  const buildTime = getBuildTime()
  const postsData = await getPostsData()
  const postsMeta = await getPostsMeta(postsData)
  const decodedSlug = decodeURIComponent(resolvedParams.slug)
  const postData = await getPostData(decodedSlug, postsData)

  return (
    <DefaultLayout buildTime={buildTime} posts={postsMeta}>
      <PageHeader
        title={postData?.title ?? 'Post Not Found'}
        description={postData?.description ?? 'The post you are looking for does not exist.'}
      >
        <div className="text-muted-foreground flex flex-wrap items-center gap-3 gap-y-5 text-sm">
          <Button variant="outline" asChild className="h-6 w-6">
            <Link href="/posts">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to all articles</span>
            </Link>
          </Button>
          {postData?.tags && postData?.tags.length > 0 && (
            <div className="text-muted-foreground flex flex-wrap gap-3">
              {postData?.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-muted text-muted-foreground flex h-6 w-fit items-center justify-center rounded-md border px-3 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <PostMetadata date={formatDate(postData?.createTime)} readingTime={postData?.readingTime} />
        </div>
      </PageHeader>
      {postData ? <PostContent post={postData} /> : <NotFoundResult />}
    </DefaultLayout>
  )
}
