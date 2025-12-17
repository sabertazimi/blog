import { describe, expect, it } from 'vitest'
import { PostComment } from '@/components/post-comment'
import { render, screen } from '@/tests/test-utils'

describe('PostComment', () => {
  it('should render comments container', () => {
    render(<PostComment />)

    const commentsContainer = screen.getByTestId('comments-container')
    expect(commentsContainer).toBeInTheDocument()
    expect(commentsContainer).toHaveClass('comments')
  })

  it('should not render Giscus initially before intersection', () => {
    render(<PostComment />)

    expect(screen.queryByTestId('giscus')).not.toBeInTheDocument()
  })

  it('should setup IntersectionObserver for lazy loading', () => {
    render(<PostComment />)

    const commentsContainer = screen.getByTestId('comments-container')
    expect(commentsContainer).toBeInTheDocument()
  })
})
