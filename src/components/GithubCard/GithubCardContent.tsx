import React from 'react';
import { Space } from 'antd';
import {
  InfoCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from '@ant-design/icons';

const GithubCardContent = ({ profile }) => (
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
