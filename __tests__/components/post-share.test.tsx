import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import PostShare from '@/components/post-share'
import { fireEvent, render, screen } from '@/tests/test-utils'

describe('PostShare', () => {
  const defaultProps = {
    url: 'https://example.com/post/test',
    title: 'Test Post Title',
  }

  beforeAll(() => {
    globalThis.window.open = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render share component', () => {
    render(<PostShare {...defaultProps} />)

    const container = screen.getByTestId('post-share-container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('flex', 'items-center', 'justify-center')
  })

  it('should render share buttons for all platforms', () => {
    render(<PostShare {...defaultProps} />)

    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should open share window when button is clicked', () => {
    render(<PostShare {...defaultProps} />)

    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('https://'),
      '_blank',
      'noopener,noreferrer,width=600,height=400',
    )
  })

  it('should have correct aria-labels', () => {
    render(<PostShare {...defaultProps} />)

    const twitterButton = screen.getByLabelText(/share on x/i)
    expect(twitterButton).toBeInTheDocument()
  })

  it('should generate correct share URLs', () => {
    render(<PostShare {...defaultProps} />)

    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining(encodeURIComponent(defaultProps.url)),
      '_blank',
      'noopener,noreferrer,width=600,height=400',
    )
  })
})
