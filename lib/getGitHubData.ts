import { siteConfig } from '@config'
import { Octokit } from '@octokit/rest'
import type { GitHub } from '@types'

export default async function getGitHubData(): Promise<GitHub> {
  const isVercel = process.env.VERCEL && process.env.NODE_ENV === 'production'
  const octokit = new Octokit()
  const username = siteConfig.socials.github
  let githubData = siteConfig.githubData

  if (isVercel) {
    try {
      const { data: profileJSON } = await octokit.rest.users.getByUsername({
        username,
      })
      const { data: reposJSON } = await octokit.request(
        'GET /users/{username}/repos',
        {
          username,
        }
      )

      githubData = {
        profile: {
          username: profileJSON.login,
          avatar: profileJSON.avatar_url,
          bio: profileJSON.bio || '',
          location: profileJSON.location || '',
          url: profileJSON.html_url,
          followers: profileJSON.followers,
          followersUrl: `${profileJSON.html_url}/followers`,
          following: profileJSON.following,
          followingUrl: `${profileJSON.html_url}/following`,
          createDate: new Date(profileJSON.created_at).toDateString(),
        },
        repos: reposJSON
          .filter(({ stargazers_count = 0 }) => stargazers_count > 0)
          .sort(
            (
              { stargazers_count: stargazers_count1 = 0 },
              { stargazers_count: stargazers_count2 = 0 }
            ) => (stargazers_count1 < stargazers_count2 ? 1 : -1)
          )
          .map(repo => ({
            name: repo.name,
            stars: repo.stargazers_count || 0,
            language: repo.language || '',
            repoUrl: repo.html_url,
          })),
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
        console.error(
          'GitHub API request error, fallback to local GitHub data.'
        )
      }
    }
  } else {
    console.info('Not for Vercel build, fallback to local GitHub data.')
  }

  return githubData
}
