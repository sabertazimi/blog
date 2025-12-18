import { describe, expect, it } from 'vitest'
import { PostHeader } from '@/components/post-header'
import { mockPost } from '@/tests/fixtures/test-data'
import { render, screen } from '@/tests/test-utils'

describe('PostHeader', () => {
  it('should render back button', () => {
    render(<PostHeader />)

    const backButton = screen.getByRole('link', { name: /back to all articles/i })
    expect(backButton).toHaveAttribute('href', '/posts')
  })

  it('should render tags when provided', () => {
    render(<PostHeader postData={mockPost} />)

    mockPost.tags?.forEach((tag) => {
      expect(screen.getByRole('link', { name: tag })).toBeInTheDocument()
    })
  })

  it('should not render tags when empty or undefined', () => {
    const { rerender } = render(<PostHeader postData={{ ...mockPost, tags: [] }} />)
    expect(screen.queryByRole('link', { name: /react/i })).not.toBeInTheDocument()

    rerender(<PostHeader postData={{ ...mockPost, tags: undefined }} />)
    expect(screen.queryByRole('link', { name: /react/i })).not.toBeInTheDocument()
  })

  it('should render post metadata when provided', () => {
    render(<PostHeader postData={mockPost} />)

    const timeElements = screen.getAllByRole('time')
    expect(timeElements).toHaveLength(2)
  })

  it('should render without postData', () => {
    render(<PostHeader />)

    expect(screen.getByRole('link', { name: /back to all articles/i })).toBeInTheDocument()
    expect(screen.queryByRole('time')).not.toBeInTheDocument()
  })
})
