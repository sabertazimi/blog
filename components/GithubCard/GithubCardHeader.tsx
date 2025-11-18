import type { Profile } from '@/types'
import { Github } from '@/components/Icons'
import { Span } from '@/components/Texts'

interface Props {
  profile: Profile
}

function GithubCardHeader({ profile }: Props) {
  return (
    <a href={profile.url}>
      <Github className="align-top text-6xl" />
      <Span size="xl">{profile.username}</Span>
    </a>
  )
}

export default GithubCardHeader
