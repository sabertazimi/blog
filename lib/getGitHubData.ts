import { siteConfig } from '@config';
import { Octokit } from '@octokit/rest';
import type { GitHub } from '@types';

let githubData: GitHub = {
  profile: {
    username: 'sabertazimi',
    avatar: 'https://avatars.githubusercontent.com/u/12670482?v=4',
    bio: 'CS',
    location: 'Wuhan',
    url: 'https://github.com/sabertazimi',
    followers: 42,
    followersUrl: 'https://github.com/sabertazimi/followers',
    following: 185,
    followingUrl: 'https://github.com/sabertazimi/following',
    createDate: 'Sat May 30 2015',
  },
  repos: [
    {
      name: 'awesome-notes',
      stars: 22,
      language: 'TypeScript',
      repoUrl: 'https://github.com/sabertazimi/awesome-notes',
    },
    {
      name: 'hust-lab',
      stars: 21,
      language: 'C',
      repoUrl: 'https://github.com/sabertazimi/hust-lab',
    },
    {
      name: 'dragon-zsh-theme',
      stars: 11,
      language: 'Shell',
      repoUrl: 'https://github.com/sabertazimi/dragon-zsh-theme',
    },
  ],
};

export default async function getGitHubData(): Promise<GitHub> {
  const octokit = new Octokit();
  const username = siteConfig.socials.github;

  try {
    const { data: profileJSON } = await octokit.rest.users.getByUsername({
      username,
    });
    const { data: reposJSON } = await octokit.request(
      'GET /users/{username}/repos',
      {
        username,
      }
    );

    githubData = {
      profile: {
        username: profileJSON.login,
        avatar: profileJSON.avatar_url,
        bio: profileJSON.bio,
        location: profileJSON.location,
        url: profileJSON.html_url,
        followers: profileJSON.followers,
        followersUrl: `${profileJSON.html_url}/followers`,
        following: profileJSON.following,
        followingUrl: `${profileJSON.html_url}/following`,
        createDate: new Date(profileJSON.created_at as string).toDateString(),
      },
      repos: reposJSON
        .filter(repo => (repo.stargazers_count as number) > 0)
        .sort((repo1, repo2) =>
          (repo1.stargazers_count as number) <
          (repo2.stargazers_count as number)
            ? 1
            : -1
        )
        .map(repo => ({
          name: repo.name,
          stars: repo.stargazers_count,
          language: repo.language,
          repoUrl: repo.html_url,
        })),
    } as GitHub;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        'GitHub API request error, fallback to local GitHub data.'
      );
    }
  }

  return githubData;
}
