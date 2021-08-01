import React from 'react';
import { GithubOutlined } from '@ant-design/icons';

const GithubCardHeader = ({ profile }) => (
  <a href={profile.url}>
    <GithubOutlined className="text-6xl align-top" />
    <span className="text-span-xl">{profile.username}</span>
  </a>
);

export default GithubCardHeader;
