import { GithubCard, MetaHeader } from '@components';
import { useSiteMetadata } from '@hooks';
import { Layout } from '@layouts';
import { GitHubType } from '@types';
import type { PageProps } from 'gatsby';
import React from 'react';

interface AboutPageProps extends PageProps {
  pageContext: {
    github: GitHubType;
  };
}

const About = ({ pageContext: { github } }: AboutPageProps): JSX.Element => {
  const { email, siteUrl, title } = useSiteMetadata();
  const { profile, repos } = github;

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <Layout banner="About Me">
        <GithubCard email={email} profile={profile} repos={repos} />
      </Layout>
    </div>
  );
};

export default About;
