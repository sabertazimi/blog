import { Environment, InfoCircle, User } from '@components/Icons'
import Space from '@components/Space'
import { Span } from '@components/Texts'
import type { Profile } from '@types'

interface Props {
  profile: Profile
}

const GithubCardContent = ({ profile }: Props): JSX.Element => (
  <Space direction="vertical">
    <div>
      <InfoCircle className="align-top text-2xl dark:text-light" />
      <Span className="dark:text-light">{profile.bio || 'No Description'}</Span>
    </div>
    <div>
      <Environment className="align-top text-2xl dark:text-light" />
      <Span className="dark:text-light">{profile.location || 'Earth'}</Span>
    </div>
    <div>
      <a href={profile.followersUrl}>
        <User className="align-top text-2xl" />
        <Span>{`${profile.followers} Followers`}</Span>
      </a>
    </div>
  </Space>
)

export default GithubCardContent
