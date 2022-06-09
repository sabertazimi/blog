import { Github } from '@components/Icons';
import type { Profile } from '@types';

interface Props {
  profile: Profile;
}

const GithubCardHeader = ({ profile }: Props): JSX.Element => (
  <a href={profile.url}>
    <Github className="align-top text-6xl" />
    <span className="text-span-xl">{profile.username}</span>
  </a>
);

export default GithubCardHeader;
