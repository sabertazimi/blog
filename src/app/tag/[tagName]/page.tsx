import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
import PostList from '@/components/post-list'
import TagFilter from '@/components/tag-filter'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostsMeta } from '@/lib/get-posts-data'
import { routes, ROUTES_INDEX } from '@/lib/routes'

interface TagPageProps {
  params: Promise<{
    tagName: string
  }>
}

export async function generateStaticParams() {
  const {
    tags: { allTags },
  } = await getPostsMeta()

  return allTags
    .filter(tag => tag !== 'All')
    .map(tag => ({
      tagName: tag,
    }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const decodedTagName = decodeURIComponent(resolvedParams.tagName)
  return {
    title: `Posts - ${decodedTagName}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params
  const decodedTagName = decodeURIComponent(resolvedParams.tagName)
  const buildTime = getBuildTime()
  const metadata = await getPostsMeta()
  const { posts, tags } = metadata

  return (
    <DefaultLayout metadata={metadata} buildTime={buildTime}>
      <PageHeader title={routes[ROUTES_INDEX.posts].title} description={routes[ROUTES_INDEX.posts].description}>
        {tags.allTags.length > 0 && <TagFilter tagsMeta={tags} selectedTag={decodedTagName} />}
      </PageHeader>
      <PostList postsMeta={posts} selectedTag={decodedTagName} />
    </DefaultLayout>
  )
}
