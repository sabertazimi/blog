import React from 'react';
import { Avatar, Card, Badge, Typography } from 'antd';
import { useSiteMetadata } from '@hooks';
import { getColorByName } from '@config';
import { GitHubType } from '@types';
import GithubCardHeader from './GithubCardHeader';
import GithubCardContent from './GithubCardContent';
import GithubRepoCard from './GithubRepoCard';

interface Props {
  github: GitHubType;
}

const GithubCard = ({ github }: Props): JSX.Element => {
  const { profile, repos } = github;
  const { email } = useSiteMetadata();

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
