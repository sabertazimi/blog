import type { Profile, Repo } from '@/types'
import { GitForkIcon, StarIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import ProfileCard from '@/components/profile-card'
import RepoCard from '@/components/repo-card'
import StatCard from '@/components/stat-card'

interface AboutMeProps {
  profile: Profile
  repos: Repo[]
}

function AboutMe({ profile, repos }: AboutMeProps) {
  const t = useTranslations('about')

  return (
    <div className="container mx-auto px-6 lg:px-0">
      <div className="border-border grid border-x lg:grid-cols-3">
        <div className="border-border lg:border-r">
          <ProfileCard profile={profile} />
        </div>
        <div className="lg:col-span-2">
          <div className="border-border grid gap-6 border-b p-6 sm:grid-cols-2">
            <StatCard
              title={t('totalRepositories')}
              value={profile.publicRepos}
              description={t('publicRepositories')}
              icon={GitForkIcon}
            />
            <StatCard
              title={t('totalStars')}
              value={profile.totalStars}
              description={t('acrossAllProjects')}
              icon={StarIcon}
            />
          </div>
          <div className="p-6">
            <h2 className="mb-4 font-serif text-lg font-semibold">{t('featuredRepositories')}</h2>
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
