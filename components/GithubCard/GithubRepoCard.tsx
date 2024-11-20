import type { Repo } from '@/types'
import Badge from '@/components/Badge'
import { Card, Meta } from '@/components/Card'
import { Branches, Star } from '@/components/Icons'
import { Tag } from '@/components/Tags'
import { Span } from '@/components/Texts'
import { getColorByName } from '@/config'

interface Props {
  repo: Repo
}

function GithubRepoCard({ repo }: Props): JSX.Element {
  return (
    <Badge.Ribbon text={repo.name} color={getColorByName(repo.name)}>
      <Card
        className="!mt-5"
        title={(
          <a href={repo.repoUrl}>
            <Branches className="align-top text-4xl" />
            <Span size="lg">{repo.name}</Span>
          </a>
        )}
      >
        <Meta
          title={(
            <Tag className="!mb-3" color={getColorByName(repo.language)}>
              {repo.language}
            </Tag>
          )}
        />
        <Star className="align-top text-2xl" />
        <Span>{repo.stars}</Span>
      </Card>
    </Badge.Ribbon>
  )
}

export default GithubRepoCard
