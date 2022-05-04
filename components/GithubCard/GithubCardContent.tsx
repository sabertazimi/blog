import { Environment, InfoCircle, User } from '@components/Icons';
import Space from '@components/Space';
import type { Profile } from '@types';

interface Props {
  profile: Profile;
}

const GithubCardContent = ({ profile }: Props): JSX.Element => (
  <Space direction="vertical">
    <div>
      <InfoCircle className="text-2xl align-top dark:text-light" />
      <span className="text-span">{profile.bio || 'No Description'}</span>
    </div>
    <div>
      <Environment className="text-2xl align-top dark:text-light" />
      <span className="text-span">{profile.location || 'Earth'}</span>
    </div>
    <div>
      <a href={profile.followersUrl}>
        <User className="text-2xl align-top" />
        <span className="inline-block ml-2 text-xl align-bottom">{`${profile.followers} Followers`}</span>
      </a>
    </div>
  </Space>
);

export default GithubCardContent;
