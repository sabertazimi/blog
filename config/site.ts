import { colors } from './colors'
import type { SocialType } from './social'
import type { GitHub } from '@/types'

interface Book {
  title: string
  author: string
  url: string
  description: string
}

interface SiteConfig {
  title: string
  author: string
  email: string
  description: string
  themeColor: string
  siteUrl: string
  disqusUrl: string
  landingTitles: string[]
  socials: {
    [key in SocialType]: string
  }
  books: Book[]
  githubData: GitHub
}

const siteConfig: SiteConfig = {
  title: 'Sabertaz Blog',
  author: 'Sabertaz',
  email: 'sabertazimi@gmail.com',
  description: 'Sabertaz Blog',
  themeColor: colors.blue,
  siteUrl: 'https://blog.tazimi.dev',
  disqusUrl: 'https://sabertaz-blog.disqus.com',
  landingTitles: [`I'm a coder.`, `I'm a learner.`],
  socials: {
    github: 'sabertazimi',
    twitter: 'sabertazimi',
    facebook: 'sabertazimi',
    linkedin: 'sabertazimi',
    weibo: 'sabertazimi',
  },
  books: [
    {
      title: 'awesome-notes',
      author: 'sabertazimi',
      url: 'https://sabertazimi.github.io/awesome-notes',
      description: 'Daily I Learned Notes',
    },
  ],
  githubData: {
    profile: {
      username: 'sabertazimi',
      avatar: 'https://avatars.githubusercontent.com/u/12670482?v=4',
      bio: 'CS',
      location: 'Wuhan',
      url: 'https://github.com/sabertazimi',
      followers: 57,
      followersUrl: 'https://github.com/sabertazimi/followers',
      following: 204,
      followingUrl: 'https://github.com/sabertazimi/following',
      createDate: 'Sat May 30 2015',
    },
    repos: [
      {
        name: 'awesome-notes',
        stars: 31,
        language: 'TypeScript',
        repoUrl: 'https://github.com/sabertazimi/awesome-notes',
      },
      {
        name: 'hust-lab',
        stars: 27,
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
        stars: 12,
        language: 'Shell',
        repoUrl: 'https://github.com/sabertazimi/dragon-zsh-theme',
      },
      {
        name: 'blog',
        stars: 10,
        language: 'TypeScript',
        repoUrl: 'https://github.com/sabertazimi/blog',
      },
    ],
  },
}

export { siteConfig }
export type { Book, SiteConfig }
