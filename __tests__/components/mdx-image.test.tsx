import { describe, expect, it } from 'vitest'
import { MDXImage } from '@/components/mdx-image'
import { render, screen } from '@/tests/test-utils'

describe('MDXImage', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test Image',
  }

  it('should render image with default alt text when alt is not provided', () => {
    render(<MDXImage src="/test.jpg" />)

    expect(screen.getByAltText('Image')).toBeInTheDocument()
  })

  it('should render image with provided alt text', () => {
    render(<MDXImage {...defaultProps} />)

    expect(screen.getByAltText('Test Image')).toBeInTheDocument()
  })

  it('should render image with provided src', () => {
    render(<MDXImage {...defaultProps} />)

    const image = screen.getByAltText('Test Image')
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  it('should render title when provided', () => {
    render(<MDXImage {...defaultProps} title="Image Title" />)

    expect(screen.getByText('Image Title')).toBeInTheDocument()
  })

  it('should not render title when empty string', () => {
    render(<MDXImage {...defaultProps} title="" />)

    expect(screen.queryByTestId('mdx-image-title')).not.toBeInTheDocument()
  })

  it('should not render title when undefined', () => {
    render(<MDXImage {...defaultProps} />)

    expect(screen.queryByTestId('mdx-image-title')).not.toBeInTheDocument()
  })

  it('should apply custom className to image', () => {
    render(<MDXImage {...defaultProps} className="custom-class" />)

    const image = screen.getByAltText('Test Image')
    expect(image).toHaveClass('custom-class')
  })
})
