import type { Metadata } from 'next'
import { GithubCard } from '@/components'
import { Layout } from '@/layouts'
import { getBuildTime, getGitHubData, getPostsMeta } from '@/lib'

export const metadata: Metadata = {
  title: 'About Me',
}

export default async function About() {
  const buildTime = getBuildTime()
  const postsMeta = await getPostsMeta()
  const { profile, repos } = await getGitHubData()

  return (
    <Layout banner="About Me" buildTime={buildTime} posts={postsMeta}>
      <GithubCard profile={profile} repos={repos} />
    </Layout>
  )
}
