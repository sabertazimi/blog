import type { Metadata } from 'next'
import { BooksGrid } from '@/components'
import { Layout } from '@/layouts'
import { getBuildTime, getPostsMeta } from '@/lib'

export const metadata: Metadata = {
  title: 'Books',
}

export default async function Books() {
  const buildTime = getBuildTime()
  const postsMeta = await getPostsMeta()

  return (
    <Layout banner="Books" buildTime={buildTime} posts={postsMeta}>
      <BooksGrid />
    </Layout>
  )
}
