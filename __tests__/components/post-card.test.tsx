import { describe, expect, it } from 'vitest'
import PostCard from '@/components/post-card'
import { mockPost } from '@/tests/fixtures/test-data'
import { render, screen } from '@/tests/test-utils'

describe('PostCard', () => {
  const defaultProps = {
    url: `/post/${mockPost.slug}`,
    title: mockPost.title,
  }

  it('should render post title and link', () => {
    render(<PostCard {...defaultProps} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', defaultProps.url)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(defaultProps.title)
  })

  it('should render description when provided', () => {
    const description = 'This is a test description'
    render(<PostCard {...defaultProps} description={description} />)

    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('should not render description when empty or undefined', () => {
    const testDescription = 'Test description'
    const { rerender } = render(<PostCard {...defaultProps} description={testDescription} />)
    expect(screen.getByText(testDescription)).toBeInTheDocument()

    rerender(<PostCard {...defaultProps} description="" />)
    expect(screen.queryByText(testDescription)).not.toBeInTheDocument()

    rerender(<PostCard {...defaultProps} description={undefined} />)
    expect(screen.queryByText(testDescription)).not.toBeInTheDocument()
  })

  it('should render post metadata when provided', () => {
    render(<PostCard {...defaultProps} createTime="2025-01-01" readingTime={5} />)

    expect(screen.getByRole('time')).toBeInTheDocument()
    expect(screen.getByText((content, element) => element?.textContent === '5 min')).toBeInTheDocument()
  })

  it('should render thumbnail image when provided', () => {
    render(<PostCard {...defaultProps} thumbnail="https://example.com/image.jpg" />)

    const image = screen.getByAltText(defaultProps.title)
    expect(image).toBeInTheDocument()
  })

  it('should conditionally apply showRightBorder class', () => {
    const { rerender } = render(<PostCard {...defaultProps} />)
    const linkWithBorder = screen.getByRole('link')
    expect(linkWithBorder).toHaveClass('md:border-r')

    rerender(<PostCard {...defaultProps} showRightBorder={false} />)
    const linkWithoutBorder = screen.getByRole('link')
    expect(linkWithoutBorder).not.toHaveClass('md:border-r')
  })
})
