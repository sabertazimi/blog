import { Github } from '@components/Icons';
import { Span } from '@components/Texts';
import type { Profile } from '@types';

interface Props {
  profile: Profile;
}

const GithubCardHeader = ({ profile }: Props): JSX.Element => (
  <a href={profile.url}>
    <Github className="align-top text-6xl" />
    <Span size="xl">{profile.username}</Span>
  </a>
);

export default GithubCardHeader;
