import type { SocialType } from '@config';

export interface Book {
  title: string;
  author: string;
  url: string;
  description: string;
}

export interface SiteMetadata {
  title: string;
  author: string;
  siteUrl: string;
  email: string;
  disqusUrl: string;
  landingTitles: string[];
  socialList: {
    [key in SocialType]: string;
  };
  bookList: Book[];
}

export declare type TagType = string;
export declare type TagsType = Record<TagType, number>;

export interface PostMetaType {
  slug: string;
  timeToRead: number;
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  gitTime?: string;
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

interface PostContentType {
  source: string;
  excerpt?: string;
  toc?: string;
  html?: string;
}

export declare type PostType = PostMetaType & PostContentType;

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

export interface GitHubType {
  profile: Profile;
  repos: Repo[];
}
