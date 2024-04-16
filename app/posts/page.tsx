import type { Metadata } from 'next'
import { PostsGrid } from '@/components'
import { Layout } from '@/layouts'
import { getBuildTime, getPostsMeta } from '@/lib'

export const metadata: Metadata = {
  title: 'Posts',
}

export default async function Posts() {
  const buildTime = getBuildTime()
  const postsMeta = await getPostsMeta()

  return (
    <Layout banner="Posts" buildTime={buildTime} posts={postsMeta}>
      <PostsGrid posts={postsMeta} />
    </Layout>
  )
}
