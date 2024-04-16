import type { Metadata } from 'next'
import { NotFoundResult } from '@/components'
import { Layout } from '@/layouts'
import { getBuildTime, getPostsMeta } from '@/lib'

export const metadata: Metadata = {
  title: 'Exploring',
}

export default async function NotFound() {
  const buildTime = getBuildTime()
  const postsMeta = await getPostsMeta()

  return (
    <div>
      <Layout banner="Exploring" buildTime={buildTime} posts={postsMeta}>
        <NotFoundResult />
      </Layout>
    </div>
  )
}
