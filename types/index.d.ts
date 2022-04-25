export declare type Tag = string;
export declare type Tags = Record<Tag, number>;

export interface PostMeta {
  slug: string;
  timeToRead: number;
  title: string;
  subtitle?: string;
  author?: string;
  createTime?: string;
  updateTime?: string;
  tags?: TagType[];
  prevPost: {
    slug: string;
    title: string;
  } | null;
  nextPost: {
    slug: string;
    title: string;
  } | null;
}

export interface PostContent {
  source: string;
  excerpt?: string;
  toc?: string;
  html?: string;
}

export declare type Post = PostMeta & PostContent;

export interface Profile {
  username: string;
  avatar: string;
  bio?: string;
  location?: string;
  url: string;
  followers: number;
  followersUrl: string;
  following: number;
  followingUrl: string;
  createDate: string;
}

export interface Repo {
  name: string;
  stars: number;
  language: string;
  repoUrl: string;
}

export interface GitHub {
  profile: Profile;
  repos: Repo[];
}

export type {
  Book,
  PaletteColor,
  Route,
  SiteConfig,
  SocialColor,
  SocialType,
} from '@config';
