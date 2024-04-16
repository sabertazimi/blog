import type { Metadata } from 'next'
import { PostsList, TagsCloud } from '@/components'
import { Layout } from '@/layouts'
import { getBuildTime, getPostsData, getPostsMeta, getTagsData } from '@/lib'

export const metadata: Metadata = {
  title: 'Tags',
}

export default async function Tags() {
  const buildTime = getBuildTime()
  const postsData = await getPostsData()
  const postsMeta = await getPostsMeta(postsData)
  const tagsData = await getTagsData(postsData)

  return (
    <Layout banner="Tags" buildTime={buildTime} posts={postsMeta}>
      <TagsCloud tags={tagsData} />
      <PostsList posts={postsMeta} />
    </Layout>
  )
}
