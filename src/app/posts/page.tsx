import type { Metadata } from 'next'
import PostsList from '@/components/posts-list'
import getBuildTime from '@/lib/get-build-time'
import { getPostsData, getPostsMeta, getTagsData } from '@/lib/get-posts-data'

export const metadata: Metadata = {
  title: 'Posts',
}

export default async function PostsPage() {
  const buildTime = getBuildTime()
  const postsData = await getPostsData()
  const postsMeta = await getPostsMeta(postsData)
  const { allTags, tagCounts } = await getTagsData(postsData)

  return (
    <PostsList buildTime={buildTime} postsMeta={postsMeta} allTags={allTags} tagCounts={tagCounts} selectedTag="All" />
  )
}
