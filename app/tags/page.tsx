import type { Metadata } from 'next'
import { PostsList, TagsCloud } from '@/components'
import { Layout } from '@/layouts'
import { getBuildTime, getPostsMeta, getTagsData } from '@/lib'

export const metadata: Metadata = {
  title: 'Tags',
}

export default async function Tags() {
  const buildTime = getBuildTime()
  const postsMeta = await getPostsMeta()
  const tagsData = await getTagsData()

  return (
    <Layout banner="Tags" buildTime={buildTime} posts={postsMeta}>
      <TagsCloud tags={tagsData} />
      <PostsList posts={postsMeta} />
    </Layout>
  )
}
