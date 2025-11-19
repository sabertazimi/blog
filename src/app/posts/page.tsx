import type { Metadata } from 'next'
import { DefaultLayout } from '@/layouts'
import { getBuildTime, getPostsMeta } from '@/lib'

export const metadata: Metadata = {
  title: 'Posts',
}

export default async function Posts() {
  const buildTime = getBuildTime()
  const postsMeta = await getPostsMeta()

  return (
    <DefaultLayout banner="Posts" buildTime={buildTime} posts={postsMeta}>
      <section>Posts</section>
      <section>
        {postsMeta.map(post => (
          <div key={post.slug}>{post.title}</div>
        ))}
      </section>
    </DefaultLayout>
  )
}
