import type { Profile, Repo } from '@/types'
import { GitFork, Star } from 'lucide-react'
import ProfileCard from '@/components/profile-card'
import RepoCard from '@/components/repo-card'
import StatCard from '@/components/stat-card'

interface AboutMeProps {
  profile: Profile
  repos: Repo[]
  totalStars: number
}

function AboutMe({ profile, repos, totalStars }: AboutMeProps) {
  return (
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

  )
}

export default AboutMe
