import type { Profile, Repo } from '@/types'

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

export const mockPostMeta = {
  title: 'Test Post',
  description: 'Test description',
  slug: 'test-post',
  date: '2025-01-01',
  tags: ['test', 'vitest'],
  thumbnail: 'https://example.com/thumbnail.jpg',
  readingTime: 5,
}
