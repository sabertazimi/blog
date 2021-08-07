import { GithubOutlined } from '@ant-design/icons';
import { Profile } from '@types';
import React from 'react';

interface Props {
  profile: Profile;
}

const GithubCardHeader = ({ profile }: Props): JSX.Element => (
  <a href={profile.url}>
    <GithubOutlined className="text-6xl align-top" />
    <span className="text-span-xl">{profile.username}</span>
  </a>
);

export default GithubCardHeader;
