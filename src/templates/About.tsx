import React from 'react';
import { PageProps } from 'gatsby';
import { GitHubType } from '@types';
import { Layout } from '@layouts';
import { GithubCard } from '@components';

interface AboutPageProps extends PageProps {
  pageContext: {
    github: GitHubType;
  }
}

const About: React.FC<AboutPageProps> = ({ pageContext: { github } }) => (
  <Layout banner="About Me">
    <GithubCard github={github} />
  </Layout>
);

export default About;
