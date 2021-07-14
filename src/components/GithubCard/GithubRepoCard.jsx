import React from 'react';
import { Card, Badge } from 'antd';
import { StarOutlined, BranchesOutlined } from '@ant-design/icons';
import { getRandomColor } from '@config';

const GithubRepoCard = ({ repo }) => (
  <Badge.Ribbon text={repo.name} color={getRandomColor()}>
    <Card
      className="mt-8"
      hoverable
      title={
        <a href={repo.repoUrl}>
          <BranchesOutlined className="text-4xl align-top" />
          <span className="text-span-lg">{repo.name}</span>
        </a>
      }
    >
      <Card.Meta title={<span className="text-span">{repo.language}</span>} />
      <StarOutlined className="text-2xl align-top" />
      <span className="text-span">{repo.stars}</span>
    </Card>
  </Badge.Ribbon>
);

export default GithubRepoCard;
