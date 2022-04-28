import { Branches, Star } from '@components/Icons';
import { getColorByName } from '@config';
import type { Repo } from '@types';
import { Badge, Card, Tag } from 'antd';

interface Props {
  repo: Repo;
}

const GithubRepoCard = ({ repo }: Props): JSX.Element => (
  <Badge.Ribbon text={repo.name} color={getColorByName(repo.name)}>
    <Card
      className="mt-8"
      hoverable
      title={
        <a href={repo.repoUrl}>
          <Branches className="text-4xl align-top" />
          <span className="text-span-lg">{repo.name}</span>
        </a>
      }
    >
      <Card.Meta
        title={
          <Tag className="mb-3" color={getColorByName(repo.language)}>
            {repo.language}
          </Tag>
        }
      />
      <Star className="text-2xl align-top" />
      <span className="text-span">{repo.stars}</span>
    </Card>
  </Badge.Ribbon>
);

export default GithubRepoCard;
