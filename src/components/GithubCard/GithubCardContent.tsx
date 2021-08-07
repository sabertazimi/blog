import {
  EnvironmentOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Profile } from '@types';
import { Space } from 'antd';
import React from 'react';

interface Props {
  profile: Profile;
}

const GithubCardContent = ({ profile }: Props): JSX.Element => (
  <Space direction="vertical">
    <div>
      <InfoCircleOutlined className="text-2xl align-top" />
      <span className="text-span">{profile.bio || 'No Description'}</span>
    </div>
    <div>
      <EnvironmentOutlined className="text-2xl align-top" />
      <span className="text-span">{profile.location || 'Earth'}</span>
    </div>
    <div>
      <a href={profile.followersUrl}>
        <UserOutlined className="text-2xl align-top" />
        <span className="text-span">{`${profile.followers} Followers`}</span>
      </a>
    </div>
  </Space>
);

export default GithubCardContent;
