import { describe, expect, it } from 'vitest'
import PostFooter from '@/components/post-footer'
import { mockPost } from '@/tests/fixtures/test-data'
import { render, screen } from '@/tests/test-utils'

describe('PostFooter', () => {
  it('should render previous post link when provided', () => {
    render(<PostFooter prevPost={mockPost.prevPost} nextPost={null} />)

    const link = screen.getByRole('link', { name: /previous post: previous post/i })
    expect(link).toHaveAttribute('href', `/post/${mockPost.prevPost!.slug}`)
    expect(screen.getByText(mockPost.prevPost!.title)).toBeInTheDocument()
    expect(screen.getByText(mockPost.prevPost!.description!)).toBeInTheDocument()
  })

  it('should render next post link when provided', () => {
    render(<PostFooter prevPost={null} nextPost={mockPost.nextPost} />)

    const link = screen.getByRole('link', { name: /next post: next post/i })
    expect(link).toHaveAttribute('href', `/post/${mockPost.nextPost!.slug}`)
    expect(screen.getByText(mockPost.nextPost!.title)).toBeInTheDocument()
    expect(screen.getByText(mockPost.nextPost!.description!)).toBeInTheDocument()
  })

  it('should render both previous and next posts', () => {
    render(<PostFooter prevPost={mockPost.prevPost} nextPost={mockPost.nextPost} />)

    expect(screen.getByRole('link', { name: /previous post/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /next post/i })).toBeInTheDocument()
    expect(screen.getByText(mockPost.prevPost!.title)).toBeInTheDocument()
    expect(screen.getByText(mockPost.nextPost!.title)).toBeInTheDocument()
  })

  it('should render nothing when both posts are null', () => {
    render(<PostFooter prevPost={null} nextPost={null} />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('should render post without description', () => {
    const postWithoutDesc = { ...mockPost.prevPost!, description: undefined }
    render(<PostFooter prevPost={postWithoutDesc} nextPost={null} />)

    expect(screen.getByText(postWithoutDesc.title)).toBeInTheDocument()
    expect(screen.queryByText(mockPost.prevPost!.description!)).not.toBeInTheDocument()
  })
})
