import React from 'react';
import { Layout } from 'layouts';
import { GithubCard } from 'components';

const About = ({ pageContext: { githubProfile, githubRepos } }) => (
  <Layout banner="About Me">
    <GithubCard githubProfile={githubProfile} githubRepos={githubRepos} />
  </Layout>
);

export default About;
