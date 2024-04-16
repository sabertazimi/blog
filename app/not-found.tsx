import { NotFoundResult } from '@/components'
import { Layout } from '@/layouts'
import { getBuildTime, getPostsMeta } from '@/lib'
import type { BuildTime, PostMeta } from '@/types'

export default async function NotFound() {
  const buildTime: BuildTime = getBuildTime()
  const postsMeta: PostMeta[] = await getPostsMeta()

  return (
    <div>
      <Layout banner="Exploring" buildTime={buildTime} posts={postsMeta}>
        <NotFoundResult />
      </Layout>
    </div>
  )
}
