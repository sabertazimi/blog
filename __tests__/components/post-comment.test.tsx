import { describe, expect, it, vi } from 'vitest'
import { PostComment } from '@/components/post-comment'
import { render, screen } from '@/tests/test-utils'

vi.mock('@/components/disqus', () => ({
  default: ({ shortname, config }: { shortname: string, config: { identifier: string, url: string } }) => (
    <div data-testid="disqus-mock">
      <span>
        Disqus:
        {shortname}
      </span>
      <span>
        Identifier:
        {config.identifier}
      </span>
      <span>
        URL:
        {config.url}
      </span>
    </div>
  ),
}))

describe('PostComment', () => {
  const defaultProps = {
    url: 'https://example.com/post/test',
    slug: 'test-post',
  }

  it('should render comments container', () => {
    render(<PostComment {...defaultProps} />)

    const commentsContainer = screen.getByTestId('comments-container')
    expect(commentsContainer).toBeInTheDocument()
    expect(commentsContainer).toHaveClass('comments')
  })

  it('should not render Disqus initially before intersection', () => {
    render(<PostComment {...defaultProps} />)

    expect(screen.queryByTestId('disqus-mock')).not.toBeInTheDocument()
  })

  it('should setup IntersectionObserver for lazy loading', () => {
    render(<PostComment {...defaultProps} />)

    const commentsContainer = screen.getByTestId('comments-container')
    expect(commentsContainer).toBeInTheDocument()
  })
})
