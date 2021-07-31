import React from 'react';
import { PageProps } from 'gatsby';
import { GitHubType } from '@types';
import { Layout } from '@layouts';
import { GithubCard } from '@components';

interface AboutPageProps extends PageProps {
  pageContext: {
    github: GitHubType;
  };
}

const About = ({ pageContext: { github } }: AboutPageProps): JSX.Element => (
  <Layout banner="About Me">
    <GithubCard github={github} />
  </Layout>
);

export default About;
