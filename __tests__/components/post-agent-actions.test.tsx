import { afterEach, describe, expect, it, vi } from 'vitest'
import { PostAgentActions } from '@/components/post-agent-actions'
import { render, screen } from '@/tests/test-utils'

describe('PostAgentActions', () => {
  const defaultProps = {
    url: 'https://example.com/post/test',
    title: 'Test Post Title',
  }

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render agent actions container', () => {
    render(<PostAgentActions {...defaultProps} />)

    const container = screen.getByTestId('post-agent-actions')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('flex', 'items-center')
  })

  it('should render Claude button', () => {
    render(<PostAgentActions {...defaultProps} />)

    expect(screen.getByText(/read with claude/i)).toBeInTheDocument()
  })

  it('should render ChatGPT button', () => {
    render(<PostAgentActions {...defaultProps} />)

    expect(screen.getByText(/read with chatgpt/i)).toBeInTheDocument()
  })

  it('should render copy for agent button', () => {
    render(<PostAgentActions {...defaultProps} />)

    expect(screen.getByText(/copy for agent/i)).toBeInTheDocument()
  })

  it('should copy agent prompt to clipboard when copy button is clicked', async () => {
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText')

    const { user } = render(<PostAgentActions {...defaultProps} />)

    await user.click(screen.getByText(/copy for agent/i))

    expect(writeTextSpy).toHaveBeenCalledWith(
      expect.stringContaining(defaultProps.title),
    )
    expect(writeTextSpy).toHaveBeenCalledWith(
      expect.stringContaining(defaultProps.url),
    )
  })

  it('should open Claude URL when Claude button is clicked', async () => {
    const openMock = vi.fn()
    vi.stubGlobal('open', openMock)

    const { user } = render(<PostAgentActions {...defaultProps} />)

    await user.click(screen.getByText(/read with claude/i))

    expect(openMock).toHaveBeenCalledWith(
      expect.stringContaining('claude.ai'),
      '_blank',
      'noopener,noreferrer',
    )
  })

  it('should open ChatGPT URL when ChatGPT button is clicked', async () => {
    const openMock = vi.fn()
    vi.stubGlobal('open', openMock)

    const { user } = render(<PostAgentActions {...defaultProps} />)

    await user.click(screen.getByText(/read with chatgpt/i))

    expect(openMock).toHaveBeenCalledWith(
      expect.stringContaining('chatgpt.com'),
      '_blank',
      'noopener,noreferrer',
    )
  })
})
