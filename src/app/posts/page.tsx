import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
import PostList from '@/components/post-list'
import TagFilter from '@/components/tag-filter'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostsMeta } from '@/lib/get-posts-data'
import { routes, ROUTES_INDEX } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Posts',
}

export default async function PostsPage() {
  const buildTime = getBuildTime()
  const metadata = await getPostsMeta()
  const { posts, tags } = metadata

  return (
    <DefaultLayout metadata={metadata} buildTime={buildTime}>
      <PageHeader title={routes[ROUTES_INDEX.posts].title} description={routes[ROUTES_INDEX.posts].description}>
        {tags.allTags.length > 0 && <TagFilter tagsMeta={tags} selectedTag="All" />}
      </PageHeader>
      <PostList postsMeta={posts} selectedTag="All" />
    </DefaultLayout>
  )
}
