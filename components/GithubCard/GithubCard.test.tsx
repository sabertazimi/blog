import MockData from '@mocks/data';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
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

  test('should render correctly when missing GitHub data (snapshot)', () => {
    const tree = create(<GithubCard email={mockEmail} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(
      <GithubCard email={mockEmail} profile={mockProfile} repos={mockRepos} />
    );

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });

  test('should render accessibility guidelines when missing bio and location data (AXE)', async () => {
    const { container } = render(
      <GithubCard
        email={mockEmail}
        profile={mockBaseProfile}
        repos={mockRepos}
      />
    );

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });

  test('should render accessibility guidelines when missing GitHub data (AXE)', async () => {
    const { container } = render(<GithubCard email={mockEmail} />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });
});
