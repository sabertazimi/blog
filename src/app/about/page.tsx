import type { Metadata } from 'next'
import { DefaultLayout } from '@/layouts'
import { getBuildTime, getGitHubData, getPostsMeta } from '@/lib'

export const metadata: Metadata = {
  title: 'About Me',
}

export default async function About() {
  const buildTime = getBuildTime()
  const postsMeta = await getPostsMeta()
  const { profile, repos } = await getGitHubData()

  return (
    <DefaultLayout banner="About Me" buildTime={buildTime} posts={postsMeta}>
      <div>About Me</div>
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
