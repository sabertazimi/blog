import React, { Component } from 'react';
import {
  Card,
  Image,
  Icon,
  Table,
  List
} from 'semantic-ui-react';

class GithubCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      repos: []
    }
  }

  render() {
    return (
      <Card centered>
        <Image centered size='medium' src={this.state.profile.avatar}/>
        <Card.Content>
          <Card.Header>
            <a href={this.state.profile.url}>
              <Icon name='github' />
              { this.props.username }
            </a>
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              Joined in { this.state.profile.createDate }
            </span>
          </Card.Meta>
          <br/>
          <Card.Description>
            <List>
              <List.Item>
                <Icon name='info circle' />
                { this.state.profile.bio || 'No Description'}
              </List.Item>
              <List.Item>
                <Icon name='marker' />
                { this.state.profile.location || 'Earth' }
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a href={this.state.profile.followersUrl}>
            <Icon name='user circle' />
            { this.state.profile.followers } Followers
          </a>
          <br/>
          <br/>
          <a href={this.state.profile.followingUrl}>
            <Icon name='user circle outline' />
            { this.state.profile.following } Following
          </a>
          <Table celled padded>
            <Table.Body>
              {
                this.state.repos.map((repo, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <a href={repo.repoUrl}>
                        { repo.name }
                      </a>
                    </Table.Cell>
                    <Table.Cell>
                      { repo.language }
                    </Table.Cell>
                    <Table.Cell>
                      <Icon name='star' />
                      { repo.stars }
                    </Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
    );
  }

  componentDidMount() {
    this.fetchGithubInfo();
  }

  fetchBaseInfo(username) {
    return new Promise(function (resolve, reject) {
      fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        resolve(data)
      })
    })
  }

  fetchReposInfo(username) {
    return new Promise(function (resolve, reject) {
      fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((data) => {
        resolve(data)
      })
    })
  }

  fetchGithubInfo() {
    const that = this;

    this.fetchBaseInfo(this.props.username).then((data) => {
      const profile = {
        avatar: data.avatar_url,
        bio: data.bio,
        location: data.location,
        url: data.html_url,
        followers: data.followers,
        followersUrl: data.html_url + '/followers',
        following: data.following,
        followingUrl: data.html_url + '/following',
        createDate: (new Date(data.created_at)).toDateString()
      }

      return profile;
    }).then((profile) => {
      that.setState({ profile: profile });
    });

    this.fetchReposInfo(this.props.username).then((data) => {
      const repos = data.filter((repo) => {
        return repo.stargazers_count > 0;
      }).sort((repo1, repo2) => {
        return repo1.stargazers_count < repo2.stargazers_count ? 1 : -1
      }).map((repo) => {
        return {
          name: repo.name,
          stars: repo.stargazers_count,
          language: repo.language,
          repoUrl: repo.html_url
        }
      }).slice(0, 3);

      return repos;
    }).then((repos) => {
      that.setState({ repos: repos });
    });
  }
}

export default GithubCard;
