import type { Metadata } from 'next'
import NotFoundResult from '@/components/not-found-result'
import PageHeader from '@/components/page-header'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostsMeta } from '@/lib/get-posts-data'

export const metadata: Metadata = {
  title: 'Not Found',
}

export default async function NotFoundPage() {
  const buildTime = getBuildTime()
  const postsMeta = await getPostsMeta()

  return (
    <DefaultLayout buildTime={buildTime} posts={postsMeta}>
      <PageHeader title="Not Found" description="The page you are looking for does not exist." />
      <NotFoundResult />
    </DefaultLayout>
  )
}
