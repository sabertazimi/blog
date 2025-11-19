import type { Metadata } from 'next'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import getGitHubData from '@/lib/get-github-data'
import { getPostsMeta } from '@/lib/get-posts-data'

export const metadata: Metadata = {
  title: 'About Me',
}

export default async function About() {
  const buildTime = getBuildTime()
  const postsMeta = await getPostsMeta()
  const { profile, repos } = await getGitHubData()

  return (
    <DefaultLayout banner="About Me" buildTime={buildTime} posts={postsMeta}>
      <div>
        GitHub:
        {profile.username}
      </div>
      <div>
        Repos:
        {repos.length}
      </div>
    </DefaultLayout>
  )
}
