import { describe, expect, it } from 'vitest'
import { PostList } from '@/components/post-list'
import { mockPostsMeta } from '@/tests/fixtures/test-data'
import { render, screen } from '@/tests/test-utils'

describe('PostList', () => {
  it('should render all posts when selectedTag is All', () => {
    render(<PostList postsMeta={mockPostsMeta} selectedTag="All" />)

    mockPostsMeta.forEach((post) => {
      expect(screen.getByRole('heading', { name: post.title })).toBeInTheDocument()
    })
  })

  it('should filter posts by selected tag', () => {
    render(<PostList postsMeta={mockPostsMeta} selectedTag="React" />)

    const reactPosts = mockPostsMeta.filter(post => post.tags?.includes('React'))
    const nonReactPosts = mockPostsMeta.filter(post => !post.tags?.includes('React'))

    reactPosts.forEach((post) => {
      expect(screen.getByRole('heading', { name: post.title })).toBeInTheDocument()
    })

    nonReactPosts.forEach((post) => {
      expect(screen.queryByRole('heading', { name: post.title })).not.toBeInTheDocument()
    })
  })

  it('should render grid layout', () => {
    render(<PostList postsMeta={mockPostsMeta} selectedTag="All" />)

    const grid = screen.getByTestId('post-grid')
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
  })

  it('should apply border-b class when posts count is less than 4', () => {
    render(<PostList postsMeta={mockPostsMeta.slice(0, 2)} selectedTag="All" />)

    const grid = screen.getByTestId('post-grid')
    expect(grid).toHaveClass('border-b')
  })

  it('should not apply border-b class when posts count is 4 or more', () => {
    const largeMockPosts = [
      ...mockPostsMeta,
      { ...mockPostsMeta[0], slug: 'test-3' },
      { ...mockPostsMeta[0], slug: 'test-4' },
    ]
    render(<PostList postsMeta={largeMockPosts} selectedTag="All" />)

    const grid = screen.getByTestId('post-grid')
    expect(grid).toHaveClass('border-b-0')
  })

  it('should render empty list when no posts match filter', () => {
    render(<PostList postsMeta={mockPostsMeta} selectedTag="NonExistentTag" />)

    mockPostsMeta.forEach((post) => {
      expect(screen.queryByRole('heading', { name: post.title })).not.toBeInTheDocument()
    })
  })
})
