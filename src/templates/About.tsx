import { GithubCard } from '@components';
import { useSiteMetadata } from '@hooks';
import { Layout } from '@layouts';
import { GitHubType } from '@types';
import { PageProps } from 'gatsby';
import React from 'react';

interface AboutPageProps extends PageProps {
  pageContext: {
    github: GitHubType;
  };
}

const About = ({ pageContext: { github } }: AboutPageProps): JSX.Element => {
  const { email } = useSiteMetadata();
  const { profile, repos } = github;

  return (
    <Layout banner="About Me">
      <GithubCard email={email} profile={profile} repos={repos} />
    </Layout>
  );
};

export default About;
