import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

export declare type BuildTime = string | number | Date

export declare type Tag = string
export declare type Tags = Record<Tag, number>

export interface MDXFrontMatter {
  layout: string
  title: string
  description?: string
  author?: string
  date?: string
  thumbnail?: string
  tags?: Tag[]
}

export interface PostMeta {
  slug: string
  title: string
  description?: string
  author?: string
  thumbnail?: string
  createTime?: string
  updateTime?: string
  readingTime: number
  tags?: Tag[]
  prevPost: {
    slug: string
    title: string
  } | null
  nextPost: {
    slug: string
    title: string
  } | null
}

export interface PostContent {
  excerpt?: string
  source: MDXRemoteSerializeResult
}

export declare type Post = PostMeta & PostContent

export interface Profile {
  username: string
  avatar: string
  bio?: string
  location?: string
  url: string
  followers: number
  followersUrl: string
  following: number
  followingUrl: string
  createDate: string
}

export interface Repo {
  name: string
  stars: number
  language: string
  repoUrl: string
}

export interface GitHub {
  profile: Profile
  repos: Repo[]
}

export type {
  PaletteColor,
} from '@/lib/colors'

export type {
  Route,
} from '@/lib/routes'

export type {
  SiteConfig,
} from '@/lib/site'

export type {
  SocialSite,
} from '@/lib/social'
