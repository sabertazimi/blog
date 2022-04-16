import MockData from '@MockData';
import React from 'react';
import { create } from 'react-test-renderer';
import GithubCard from './GithubCard';

describe('GithubCard', () => {
  const mockEmail = MockData.siteMetadata.email;
  const mockBaseProfile = MockData.baseProfile;
  const mockProfile = MockData.profile;
  const mockRepos = MockData.repos;

  test('should render correctly (snapshot)', () => {
    const tree = create(
      <GithubCard email={mockEmail} profile={mockProfile} repos={mockRepos} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render correctly when missing bio and location data (snapshot)', () => {
    const tree = create(
      <GithubCard
        email={mockEmail}
        profile={mockBaseProfile}
        repos={mockRepos}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render correctly when missing github data (snapshot)', () => {
    const tree = create(<GithubCard email={mockEmail} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
