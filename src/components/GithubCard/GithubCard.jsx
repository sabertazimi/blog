import React from 'react';
import { Typography } from 'antd';
import { Card, Image, Icon, Table, List } from 'semantic-ui-react';
import { useSiteMetadata } from '@hooks';

const GithubCard = ({ github }) => {
  const { profile, repos } = github;
  const { email } = useSiteMetadata();

  if (profile && repos) {
    return (
      <Card centered fluid>
        <Image centered size="medium" src={profile.avatar} />
        <Card.Content>
          <Card.Header>
            <a href={profile.url}>
              <Icon name="github" />
              {profile.username}
            </a>
          </Card.Header>
          <Card.Meta>
            <span className="date">Joined in {profile.createDate}</span>
          </Card.Meta>
          <br />
          <Card.Description>
            <List>
              <List.Item>
                <Icon name="info circle" />
                {profile.bio || 'No Description'}
              </List.Item>
              <List.Item>
                <Icon name="marker" />
                {profile.location || 'Earth'}
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a href={profile.followersUrl}>
            <Icon name="user circle" />
            {profile.followers} Followers
          </a>
          <br />
          <br />
          <a href={profile.followingUrl}>
            <Icon name="user circle outline" />
            {profile.following} Following
          </a>
          <Table celled padded>
            <Table.Body>
              {repos.map((repo, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <a href={repo.repoUrl}>{repo.name}</a>
                  </Table.Cell>
                  <Table.Cell>{repo.language}</Table.Cell>
                  <Table.Cell>
                    <Icon name="star" />
                    {repo.stars}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
    );
  }

  return (
    <div
      style={{
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <Typography.Title>About me</Typography.Title>
      <Typography.Paragraph>
        <Typography.Text className="text-xl">
          Please mail to <a href={`mailto:${email}`}>me</a>.
        </Typography.Text>
      </Typography.Paragraph>
    </div>
  );
};

export default GithubCard;
