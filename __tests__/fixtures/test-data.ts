import type { Metadata, Post, PostsMeta, Profile, Repo, TagsMeta } from '@/types'

export const mockProfile: Profile = {
  username: 'testuser',
  bio: 'Test bio',
  avatar: 'https://example.com/avatar.jpg',
  url: 'https://github.com/testuser',
  location: 'Test City',
  createDate: '2020-01-01',
  followers: 100,
  following: 50,
  followersUrl: 'https://github.com/testuser/followers',
  followingUrl: 'https://github.com/testuser/following',
}

export const mockRepos: Repo[] = [
  {
    name: 'test-repo-1',
    language: 'TypeScript',
    stars: 100,
    repoUrl: 'https://github.com/testuser/test-repo-1',
  },
  {
    name: 'test-repo-2',
    language: 'JavaScript',
    stars: 50,
    repoUrl: 'https://github.com/testuser/test-repo-2',
  },
]

export const mockPost: Post = {
  slug: 'test-post',
  title: 'Test Post',
  description: 'Test description',
  thumbnail: 'https://example.com/thumbnail.jpg',
  createTime: '2025-01-01',
  updateTime: '2025-01-15',
  readingTime: 5,
  tags: ['React', 'TypeScript', 'Testing'],
  prevPost: {
    slug: 'previous-post',
    title: 'Previous Post',
    description: 'Previous post description',
  },
  nextPost: {
    slug: 'next-post',
    title: 'Next Post',
    description: 'Next post description',
  },
  source: {
    compiledSource: '',
    scope: {},
    frontmatter: {},
  },
}

export const mockPostMeta = {
  title: 'Test Post',
  description: 'Test description',
  slug: 'test-post',
  date: '2025-01-01',
  tags: ['test', 'vitest'],
  thumbnail: 'https://example.com/thumbnail.jpg',
  readingTime: 5,
}

export const mockPostsMeta: PostsMeta = [
  {
    slug: 'test-post-1',
    title: 'Test Post 1',
    description: 'First test post',
    createTime: '2025-01-01',
    readingTime: 5,
    tags: ['React', 'TypeScript'],
    prevPost: {
      slug: 'previous-post',
      title: 'Previous Post',
      description: 'Previous post description',
    },
    nextPost: {
      slug: 'next-post',
      title: 'Next Post',
      description: 'Next post description',
    },
  },
  {
    slug: 'test-post-2',
    title: 'Test Post 2',
    description: 'Second test post',
    createTime: '2025-01-02',
    readingTime: 3,
    tags: ['Testing'],
    prevPost: {
      slug: 'previous-post',
      title: 'Previous Post',
      description: 'Previous post description',
    },
    nextPost: {
      slug: 'next-post',
      title: 'Next Post',
      description: 'Next post description',
    },
  },
]

export const mockTagsMeta: TagsMeta = {
  allTags: ['All', 'React', 'TypeScript', 'Testing'],
  tagCounts: {
    All: 10,
    React: 5,
    TypeScript: 3,
    Testing: 2,
  },
}

export const mockMetadata: Metadata = {
  posts: mockPostsMeta,
  tags: mockTagsMeta,
}
