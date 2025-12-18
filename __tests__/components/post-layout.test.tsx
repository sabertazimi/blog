import { describe, expect, it } from 'vitest'
import { PostLayout } from '@/components/post-layout'
import { mockPost } from '@/tests/fixtures/test-data'
import { render, screen } from '@/tests/test-utils'

describe('PostLayout', () => {
  it('should render article element', () => {
    render(<PostLayout post={mockPost} />)

    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()
  })

  it('should render post image', () => {
    render(<PostLayout post={mockPost} />)

    const image = screen.getByAltText(mockPost.title)
    expect(image).toBeInTheDocument()
  })

  it('should render post footer with navigation', () => {
    render(<PostLayout post={mockPost} />)

    expect(screen.getByRole('link', { name: /previous post/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /next post/i })).toBeInTheDocument()
  })

  it('should render back to top button', () => {
    render(<PostLayout post={mockPost} />)

    const backToTopButton = screen.getByLabelText(/back to top/i)
    expect(backToTopButton).toBeInTheDocument()
  })

  it('should render aside for table of contents', () => {
    render(<PostLayout post={mockPost} />)

    const aside = screen.getByTestId('post-toc-aside')
    expect(aside).toBeInTheDocument()
  })
})
