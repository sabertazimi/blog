import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
import PostList from '@/components/post-list'
import TagFilter from '@/components/tag-filter'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostsData, getPostsMeta, getTagsData } from '@/lib/get-posts-data'
import { routes, ROUTES_INDEX } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Posts',
}

export default async function PostsPage() {
  const buildTime = getBuildTime()
  const postsData = await getPostsData()
  const postsMeta = await getPostsMeta(postsData)
  const { allTags, tagCounts } = await getTagsData(postsData)

  return (
    <DefaultLayout buildTime={buildTime} posts={postsMeta} tags={allTags}>
      <PageHeader title={routes[ROUTES_INDEX.posts].title} description={routes[ROUTES_INDEX.posts].description}>
        {allTags.length > 0 && <TagFilter tags={allTags} selectedTag="All" tagCounts={tagCounts} />}
      </PageHeader>
      <PostList postsMeta={postsMeta} selectedTag="All" />
    </DefaultLayout>
  )
}
