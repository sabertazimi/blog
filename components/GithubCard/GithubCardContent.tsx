import { Environment, InfoCircle, User } from '@components/Icons';
import Space from '@components/Space';
import type { Profile } from '@types';

interface Props {
  profile: Profile;
}

const GithubCardContent = ({ profile }: Props): JSX.Element => (
  <Space direction="vertical">
    <div>
      <InfoCircle className="align-top text-2xl dark:text-light" />
      <span className="text-span">{profile.bio || 'No Description'}</span>
    </div>
    <div>
      <Environment className="align-top text-2xl dark:text-light" />
      <span className="text-span">{profile.location || 'Earth'}</span>
    </div>
    <div>
      <a href={profile.followersUrl}>
        <User className="align-top text-2xl" />
        <span className="ml-2 inline-block align-bottom text-xl">{`${profile.followers} Followers`}</span>
      </a>
    </div>
  </Space>
);

export default GithubCardContent;
