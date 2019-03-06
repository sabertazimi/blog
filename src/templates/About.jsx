import React from 'react';
import { SimpleLayout } from '../layouts';
import { GithubCard } from '../components';

export default ({ pageContext: { githubProfile, githubRepos } }) =>
  githubProfile && githubRepos ? (
    <SimpleLayout>
      <GithubCard githubProfile={githubProfile} githubRepos={githubRepos} />
    </SimpleLayout>
  ) : (
    <SimpleLayout>
      <div style={{ margin: '0 auto', padding: '4em 8em', maxWidth: 960, textAlign: 'center' }}>
        <h1>About me</h1>
        <p>
          Please mail to <a href="mailto:sabertazimi@gmail.com">me</a>.
        </p>
      </div>
    </SimpleLayout>
  );
