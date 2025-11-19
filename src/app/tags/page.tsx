import type { Metadata } from 'next'
import { DefaultLayout } from '@/layouts'
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
    <DefaultLayout banner="Tags" buildTime={buildTime} posts={postsMeta}>
      <section>Tags</section>
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
