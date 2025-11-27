import type { SocialSite } from '@/lib/social'
import type { GitHub } from '@/types'
import { colors } from '@/lib/colors'

interface SiteConfig {
  author: string
  email: string
  themeColor: string
  url: string
  disqusShortname: string
  socials: {
    [key in SocialSite]: string
  }
  maxLandingStars: number
  minRepoStars: number
  githubData: GitHub
}

const siteConfig: SiteConfig = {
  author: 'Sabertaz',
  email: 'sabertazimi@gmail.com',
  themeColor: colors.black,
  url: 'https://blog.tazimi.dev',
  disqusShortname: 'sabertaz-blog',
  socials: {
    github: 'sabertazimi',
    x: 'sabertazimi',
    facebook: 'sabertazimi',
    weibo: 'sabertazimi',
  },
  maxLandingStars: 800,
  minRepoStars: 3,
  githubData: {
    profile: {
      username: 'sabertazimi',
      name: 'Sabertaz',
      avatar: 'https://avatars.githubusercontent.com/u/12670482?v=4',
      bio: 'Web Developer',
      location: 'Undefined',
      url: 'https://github.com/sabertazimi',
      followers: 72,
      followersUrl: 'https://github.com/sabertazimi?tab=followers',
      following: 206,
      followingUrl: 'https://github.com/sabertazimi?tab=following',
      publicRepos: 15,
      publicGists: 0,
      totalStars: 175,
      createDate: 'Sat May 30 2015',
    },
    repos: [
      {
        name: 'blog',
        stars: 42,
        language: 'TypeScript',
        repoUrl: 'https://github.com/sabertazimi/blog',
      },
      {
        name: 'awesome-notes',
        stars: 44,
        language: 'TypeScript',
        repoUrl: 'https://github.com/sabertazimi/awesome-notes',
      },
      {
        name: 'hust-lab',
        stars: 31,
        language: 'C',
        repoUrl: 'https://github.com/sabertazimi/hust-lab',
      },
      {
        name: 'LaTeX-snippets',
        stars: 15,
        language: 'JSON',
        repoUrl: 'https://github.com/sabertazimi/LaTeX-snippets',
      },
      {
        name: 'dragon-zsh-theme',
        stars: 13,
        language: 'Shell',
        repoUrl: 'https://github.com/sabertazimi/dragon-zsh-theme',
      },
      {
        name: 'bod',
        stars: 5,
        language: 'TypeScript',
        repoUrl: 'https://github.com/sabertazimi/bod',
      },
    ],
  },
}

export { siteConfig }
export type { SiteConfig }
