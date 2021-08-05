import React from 'react';
import renderer from 'react-test-renderer';
import GithubCard from './GithubCard';

describe('GithubCard', () => {
  const email = 'sabertazimi@gmail.com';
  const baseProfile = {
    username: 'sabertazimi',
    avatar: 'https://avatars.githubusercontent.com/u/12670482?v=4',
    url: 'https://github.com/sabertazimi',
    followers: 42,
    followersUrl: 'https://github.com/sabertazimi/followers',
    following: 185,
    followingUrl: 'https://github.com/sabertazimi/following',
    createDate: 'Sat May 30 2015',
  };
  const profile = {
    ...baseProfile,
    bio: 'CS',
    location: 'Wuhan',
  };
  const repos = [
    {
      name: 'hust-lab',
      stars: 22,
      language: 'C',
      repoUrl: 'https://github.com/sabertazimi/hust-lab',
    },
    {
      name: 'awesome-notes',
      stars: 22,
      language: 'JavaScript',
      repoUrl: 'https://github.com/sabertazimi/awesome-notes',
    },
    {
      name: 'dragon-zsh-theme',
      stars: 11,
      language: 'Zsh',
      repoUrl: 'https://github.com/sabertazimi/dragon-zsh-theme',
    },
  ];

  test('should render correctly (snapshot)', () => {
    const tree = renderer
      .create(<GithubCard profile={profile} repos={repos} email={email} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render correctly when missing bio and location data (snapshot)', () => {
    const tree = renderer
      .create(<GithubCard email={email} profile={baseProfile} repos={repos} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render correctly when missing github data (snapshot)', () => {
    const tree = renderer.create(<GithubCard email={email} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
