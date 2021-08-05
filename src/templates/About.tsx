import React from 'react';
import { PageProps } from 'gatsby';
import { GitHubType } from '@types';
import { useSiteMetadata } from '@hooks';
import { Layout } from '@layouts';
import { GithubCard } from '@components';

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
      <GithubCard profile={profile} repos={repos} email={email} />
    </Layout>
  );
};

export default About;
