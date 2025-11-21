import type { Metadata } from 'next'
import AboutMe from '@/components/about-me'
import PageHeader from '@/components/page-header'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import getGitHubData from '@/lib/get-github-data'
import { getPostsMeta } from '@/lib/get-posts-data'
import { routes, ROUTES_INDEX } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'About Me',
}

export default async function AboutPage() {
  const buildTime = getBuildTime()
  const postsMeta = await getPostsMeta()
  const { profile, repos } = await getGitHubData()
  const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0)

  return (
    <DefaultLayout buildTime={buildTime} posts={postsMeta}>
      <PageHeader title={routes[ROUTES_INDEX.about].title} description={routes[ROUTES_INDEX.about].description} />
      <AboutMe profile={profile} repos={repos} totalStars={totalStars} />
    </DefaultLayout>
  )
}
