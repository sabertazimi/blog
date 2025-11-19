import type { Metadata } from 'next'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostsData, getPostsMeta, getTagsData } from '@/lib/get-posts-data'

export const metadata: Metadata = {
  title: 'Tags',
}

export default async function Tags() {
  const buildTime = getBuildTime()
  const postsData = await getPostsData()
  const postsMeta = await getPostsMeta(postsData)
  const tagsData = await getTagsData(postsData)

  return (
    <DefaultLayout banner="Tags" buildTime={buildTime} posts={postsMeta}>
      <section>
        {Object.entries(tagsData).map(([name, count]) => (
          <div key={name}>
            {name}
            :
            {' '}
            {count}
          </div>
        ))}
      </section>
      <section>
        {postsMeta.map(post => (
          <div key={post.slug}>{post.title}</div>
        ))}
      </section>
    </DefaultLayout>
  )
}
