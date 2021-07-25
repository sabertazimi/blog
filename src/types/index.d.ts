export interface PostType {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  tags: string;
  date: string;
  timeToRead: string;
  excerpt?: string;
  toc?: string;
  html?: string;
  prevPost: string;
  nextPost: string;
}

export type TagType = string;

interface Profile {
  username: string;
  avatar: string;
  bio: string;
  location: string;
  url: string;
  followers: number;
  followersUrl: string;
  following: number;
  followingUrl: string;
  createDate: string;
}

interface Repo {
  name: string;
  stars: number;
  language: string;
  repoUrl: string;
}

export interface GitHubType {
  profile: Profile;
  repos: Repo[];
}

