import type { Metadata } from 'next'
import NotFoundResult from '@/components/not-found-result'
import PageHeader from '@/components/page-header'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostsData, getPostsMeta, getTagsData } from '@/lib/get-posts-data'

export const metadata: Metadata = {
  title: 'Not Found',
}

export default async function NotFoundPage() {
  const buildTime = getBuildTime()
  const postsData = await getPostsData()
  const postsMeta = await getPostsMeta(postsData)
  const { allTags } = await getTagsData(postsData)

  return (
    <DefaultLayout buildTime={buildTime} posts={postsMeta} tags={allTags}>
      <PageHeader title="Not Found" description="The page you are looking for does not exist." />
      <NotFoundResult />
    </DefaultLayout>
  )
}
