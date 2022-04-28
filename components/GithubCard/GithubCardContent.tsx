import { Environment, InfoCircle, User } from '@components/Icons';
import type { Profile } from '@types';
import { Space } from 'antd';

interface Props {
  profile: Profile;
}

const GithubCardContent = ({ profile }: Props): JSX.Element => (
  <Space direction="vertical">
    <div>
      <InfoCircle className="text-2xl align-top" />
      <span className="text-span">{profile.bio || 'No Description'}</span>
    </div>
    <div>
      <Environment className="text-2xl align-top" />
      <span className="text-span">{profile.location || 'Earth'}</span>
    </div>
    <div>
      <a href={profile.followersUrl}>
        <User className="text-2xl align-top" />
        <span className="text-span">{`${profile.followers} Followers`}</span>
      </a>
    </div>
  </Space>
);

export default GithubCardContent;
