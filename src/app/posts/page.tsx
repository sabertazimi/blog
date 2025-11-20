import type { Metadata } from 'next'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostsMeta } from '@/lib/get-posts-data'

export const metadata: Metadata = {
  title: 'Posts',
}

export default async function Posts() {
  const buildTime = getBuildTime()
  const postsMeta = await getPostsMeta()

  return (
    <DefaultLayout buildTime={buildTime} posts={postsMeta}>
      <div className="container flex-1 mx-auto">
        <section>
          {postsMeta.map(post => (
            <div key={post.slug}>{post.title}</div>
          ))}
        </section>
      </div>
    </DefaultLayout>
  )
}
