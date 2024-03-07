import Avatar from '@components/Avatar'
import Badge from '@components/Badge'
import { Card, Meta } from '@components/Card'
import { getColorByName } from '@config'
import type { Profile, Repo } from '@types'
import GithubCardContent from './GithubCardContent'
import GithubCardHeader from './GithubCardHeader'
import GithubRepoCard from './GithubRepoCard'

interface Props {
  profile: Profile
  repos: Repo[]
}

const GithubCard = ({ profile, repos }: Props): JSX.Element => {
  const { username, avatar, createDate } = profile

  return (
    <Badge.Ribbon text={username} color={getColorByName(username)}>
      <Card title={<GithubCardHeader profile={profile} />}>
        <Meta
          avatar={<Avatar src={avatar} alt={username} />}
          title={<GithubCardContent profile={profile} />}
          description={`Joined in ${createDate}`}
        />
        {repos.map((repo, index) => (
          <GithubRepoCard key={index} repo={repo} />
        ))}
      </Card>
    </Badge.Ribbon>
  )
}

export default GithubCard
