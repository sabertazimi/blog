import type { SocialSite } from './social'
import type { GitHub } from '@/types'
import { colors } from './colors'

interface SiteConfig {
  title: string
  author: string
  email: string
  description: string
  themeColor: string
  url: string
  disqusShortname: string
  landingPage: {
    starsCount: number
    titles: string[]
  }
  socials: {
    [key in SocialSite]: string
  }
  githubData: GitHub
}

const siteConfig: SiteConfig = {
  title: 'Sabertaz Blog',
  author: 'Sabertaz',
  email: 'sabertazimi@gmail.com',
  description:
    'A modern blog about web development, programming, and technology. Sharing insights on React, TypeScript, Next.js, and more.',
  themeColor: colors.black,
  url: 'https://blog.tazimi.dev',
  disqusShortname: 'sabertaz-blog',
  landingPage: {
    starsCount: 800,
    titles: ['Coder', 'Developer', 'Learner'],
  },
  socials: {
    github: 'sabertazimi',
    x: 'sabertazimi',
    facebook: 'sabertazimi',
    weibo: 'sabertazimi',
  },
  githubData: {
    profile: {
      username: 'sabertazimi',
      avatar: 'https://avatars.githubusercontent.com/u/12670482?v=4',
      bio: 'Web Developer',
      location: 'Undefined',
      url: 'https://github.com/sabertazimi',
      followers: 72,
      followersUrl: 'https://github.com/sabertazimi?tab=followers',
      following: 206,
      followingUrl: 'https://github.com/sabertazimi?tab=following',
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
