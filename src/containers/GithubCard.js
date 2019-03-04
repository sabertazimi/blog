import React, { Component } from 'react';

import { GithubCard } from '../components';

class GithubCardContainer extends Component {
  state = {
    profile: {},
    repos: [],
  };

  render() {
    const { profile, repos } = this.state;
    return (<GithubCard profile={profile} repos={repos} />);
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
    const { username } = this.props;

    this.fetchBaseInfo(username).then((data) => {
      const profile = {
        username: data.login,
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
      this.setState({ profile: profile });
    });

    this.fetchReposInfo(username).then((data) => {
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
      this.setState({ repos: repos });
    });
  }
}

export default GithubCardContainer;
