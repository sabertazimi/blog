import { describe, expect, it } from 'vitest'
import { PostShare } from '@/components/post-share'
import { render, screen } from '@/tests/test-utils'

describe('PostShare', () => {
  const defaultProps = {
    url: 'https://example.com/post/test',
    title: 'Test Post Title',
  }

  it('should render share component', () => {
    render(<PostShare {...defaultProps} />)

    const container = screen.getByTestId('post-share-container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('flex', 'items-center', 'justify-center')
  })

  it('should render share buttons for all platforms', () => {
    render(<PostShare {...defaultProps} />)

    expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
  })

  it('should open share window when button is clicked', async () => {
    const { user } = render(<PostShare {...defaultProps} />)

    await user.click(screen.getAllByRole('button')[0])

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('https://'),
      '_blank',
      'noopener,noreferrer,width=600,height=400',
    )
  })

  it('should have correct aria-labels', () => {
    render(<PostShare {...defaultProps} />)

    expect(screen.getByLabelText(/share on x/i)).toBeInTheDocument()
  })

  it('should generate correct share URLs', async () => {
    const { user } = render(<PostShare {...defaultProps} />)

    await user.click(screen.getAllByRole('button')[0])

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining(encodeURIComponent(defaultProps.url)),
      '_blank',
      'noopener,noreferrer,width=600,height=400',
    )
  })
})
