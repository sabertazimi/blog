import type { Profile } from '@/types'
import { Environment, InfoCircle, User } from '@/components/Icons'
import Space from '@/components/Space'
import { Span } from '@/components/Texts'

interface Props {
  profile: Profile
}

function GithubCardContent({ profile }: Props) {
  return (
    <Space direction="vertical">
      <div>
        <InfoCircle className="align-top text-2xl" />
        <Span>{profile.bio ?? 'No Description'}</Span>
      </div>
      <div>
        <Environment className="align-top text-2xl" />
        <Span>{profile.location ?? 'Earth'}</Span>
      </div>
      <div>
        <a href={profile.followersUrl}>
          <User className="align-top text-2xl" />
          <Span>{`${profile.followers} Followers`}</Span>
        </a>
      </div>
    </Space>
  )
}

export default GithubCardContent
