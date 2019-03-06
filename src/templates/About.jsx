import React from 'react';
import { SimpleLayout } from '../layouts';
import { GithubCard } from '../components';

export default ({ pageContext: { githubProfile, githubRepos } }) => (
  <SimpleLayout>
    <GithubCard githubProfile={githubProfile} githubRepos={githubRepos} />
  </SimpleLayout>
);
