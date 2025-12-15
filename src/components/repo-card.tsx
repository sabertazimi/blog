import type { Repo } from '@/types'
import { GitForkIcon, StarIcon } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { colors } from '@/lib/colors'

interface RepoCardProps {
  repo: Repo
}

function RepoCard({ repo }: RepoCardProps) {
  return (
    <Link
      href={repo.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="border-border hover:bg-muted block rounded-lg border p-4 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <GitForkIcon className="text-muted-foreground size-4" />
            <h3 className="font-semibold">{repo.name}</h3>
          </div>
          <div className="mt-2 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <span
                aria-label={repo.language}
                className="size-3 rounded-full"
                style={{
                  backgroundColor: colors[repo.language as keyof typeof colors] ?? colors.gray,
                }}
              />
              <span className="text-muted-foreground">{repo.language}</span>
            </span>
            <span className="text-muted-foreground flex items-center gap-1">
              <StarIcon className="size-3" />
              {repo.stars}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RepoCard
