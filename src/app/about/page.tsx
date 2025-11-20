import type { Metadata } from 'next'
import { GitFork, Star } from 'lucide-react'
import PageHeader from '@/components/page-header'
import ProfileCard from '@/components/profile-card'
import RepoCard from '@/components/repo-card'
import StatCard from '@/components/stat-card'
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
      <div className="container mx-auto px-6 lg:px-0">
        <div className="border-border grid border-x lg:grid-cols-3">
          <div className="border-border lg:border-r">
            <ProfileCard profile={profile} />
          </div>
          <div className="lg:col-span-2">
            <div className="border-border grid gap-6 border-b p-6 sm:grid-cols-2">
              <StatCard
                title="Total Repositories"
                value={repos.length}
                description="Public repositories"
                icon={GitFork}
              />
              <StatCard title="Total Stars" value={totalStars} description="Across all projects" icon={Star} />
            </div>
            <div className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Featured Repositories</h3>
              <div className="space-y-3">
                {repos.map(repo => (
                  <RepoCard key={repo.name} repo={repo} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
