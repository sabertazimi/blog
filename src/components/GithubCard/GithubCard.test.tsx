import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import GithubCard from './GithubCard';

describe('GithubCard', () => {
  const github = {
    profile: {
      username: 'sabertazimi',
      avatar: 'https://avatars.githubusercontent.com/u/12670482?v=4',
      bio: 'CS',
      location: 'Wuhan',
      url: 'https://github.com/sabertazimi',
      followers: 42,
      followersUrl: 'https://github.com/sabertazimi/followers',
      following: 185,
      followingUrl: 'https://github.com/sabertazimi/following',
      createDate: 'Sat May 30 2015',
    },
    repos: [
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
    ],
  };

  test('should render correctly (snapshot)', () => {
    const tree = renderer.create(<GithubCard github={github} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
