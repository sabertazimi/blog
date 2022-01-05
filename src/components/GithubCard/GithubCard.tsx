import { getColorByName } from '@config';
import type { Profile, Repo } from '@types';
import { Avatar, Badge, Card, Typography } from 'antd';
import React from 'react';
import GithubCardContent from './GithubCardContent';
import GithubCardHeader from './GithubCardHeader';
import GithubRepoCard from './GithubRepoCard';

interface Props {
  email: string;
  profile?: Profile;
  repos?: Repo[];
}

const GithubCard = ({ email, profile, repos }: Props): JSX.Element => {
  if (profile && repos) {
    return (
      <Badge.Ribbon
        text={profile.username}
        color={getColorByName(profile.username)}
      >
        <Card hoverable title={<GithubCardHeader profile={profile} />}>
          <Card.Meta
            avatar={<Avatar src={profile.avatar} />}
            title={<GithubCardContent profile={profile} />}
            description={`Joined in ${profile.createDate}`}
          />
          {repos.map((repo, index) => (
            <GithubRepoCard key={index} repo={repo} />
          ))}
        </Card>
      </Badge.Ribbon>
    );
  }

  return (
    <div className="mx-auto my-0 text-center">
      <Typography.Title>
        Please mail to <a href={`mailto:${email}`}>me</a>.
      </Typography.Title>
    </div>
  );
};

export default GithubCard;
