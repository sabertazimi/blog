import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
import PostList from '@/components/post-list'
import TagFilter from '@/components/tag-filter'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostsData, getPostsMeta, getTagsData } from '@/lib/get-posts-data'
import { routes, ROUTES_INDEX } from '@/lib/routes'

interface TagPageProps {
  params: Promise<{
    tagName: string
  }>
}

export async function generateStaticParams() {
  const postsData = await getPostsData()
  const { allTags } = await getTagsData(postsData)

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
  const buildTime = getBuildTime()
  const postsData = await getPostsData()
  const postsMeta = await getPostsMeta(postsData)
  const { allTags, tagCounts } = await getTagsData(postsData)
  const decodedTagName = decodeURIComponent(resolvedParams.tagName)

  return (
    <DefaultLayout buildTime={buildTime} posts={postsMeta} tags={allTags}>
      <PageHeader title={routes[ROUTES_INDEX.posts].title} description={routes[ROUTES_INDEX.posts].description}>
        {allTags.length > 0 && <TagFilter tags={allTags} selectedTag={decodedTagName} tagCounts={tagCounts} />}
      </PageHeader>
      <PostList postsMeta={postsMeta} selectedTag={decodedTagName} />
    </DefaultLayout>
  )
}
