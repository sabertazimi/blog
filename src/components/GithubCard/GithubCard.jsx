import React from 'react';
import { Spring } from 'react-spring/renderprops';
import { Container, Card, Image, Icon, Table, List } from 'semantic-ui-react';

const GithubCard = ({ githubProfile, githubRepos }) => (
  <Spring
    from={{ opacity: 0, transform: 'translateX(-200px)' }}
    to={{ opacity: 1, transform: 'translateX(0)' }}
  >
    {props =>
      githubProfile && githubRepos ? (
        <Container style={{ ...props, maxWidth: 960, padding: '1em' }} className="slideIn">
          <Card centered fluid>
            <Image centered size="medium" src={githubProfile.avatar} />
            <Card.Content>
              <Card.Header>
                <a href={githubProfile.url}>
                  <Icon name="github" />
                  {githubProfile.username}
                </a>
              </Card.Header>
              <Card.Meta>
                <span className="date">
                  Joined in {githubProfile.createDate}
                </span>
              </Card.Meta>
              <br />
              <Card.Description>
                <List>
                  <List.Item>
                    <Icon name="info circle" />
                    {githubProfile.bio || 'No Description'}
                  </List.Item>
                  <List.Item>
                    <Icon name="marker" />
                    {githubProfile.location || 'Earth'}
                  </List.Item>
                </List>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a href={githubProfile.followersUrl}>
                <Icon name="user circle" />
                {githubProfile.followers} Followers
              </a>
              <br />
              <br />
              <a href={githubProfile.followingUrl}>
                <Icon name="user circle outline" />
                {githubProfile.following} Following
              </a>
              <Table celled padded>
                <Table.Body>
                  {githubRepos.map((repo, index) => (
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
        </Container>
      ) : (
        <div
          style={{
            ...props,
            margin: '0 auto',
            padding: '4em 8em',
            maxWidth: 960,
            textAlign: 'center',
          }}
          className="slideIn"
        >
          <h1>About me</h1>
          <p>
            Please mail to <a href="mailto:sabertazimi@gmail.com">me</a>.
          </p>
        </div>
      )
    }
  </Spring>
);

export default GithubCard;
