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
    expect(container).toHaveClass('flex', 'items-center', 'justify-center')
  })

  it('should render copy for agent button', () => {
    render(<PostAgentActions {...defaultProps} />)

    expect(screen.getByLabelText(/copy for ai agent/i)).toBeInTheDocument()
  })

  it('should render read with chatbot button', () => {
    render(<PostAgentActions {...defaultProps} />)

    expect(screen.getByLabelText(/read with ai chatbot/i)).toBeInTheDocument()
  })

  it('should copy agent prompt to clipboard when copy button is clicked', async () => {
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText')

    const { user } = render(<PostAgentActions {...defaultProps} />)

    await user.click(screen.getByLabelText(/copy for ai agent/i))

    expect(writeTextSpy).toHaveBeenCalledWith(
      expect.stringContaining(defaultProps.title),
    )
    expect(writeTextSpy).toHaveBeenCalledWith(
      expect.stringContaining(defaultProps.url),
    )
  })

  it('should open dropdown menu when chatbot button is clicked', async () => {
    const { user } = render(<PostAgentActions {...defaultProps} />)

    await user.click(screen.getByLabelText(/read with ai chatbot/i))

    expect(screen.getByText(/read with chatgpt/i)).toBeInTheDocument()
    expect(screen.getByText(/read with claude/i)).toBeInTheDocument()
    expect(screen.getByText(/read with gemini/i)).toBeInTheDocument()
    expect(screen.getByText(/read with deepseek/i)).toBeInTheDocument()
    expect(screen.getByText(/read with kimi/i)).toBeInTheDocument()
  })

  it('should open chatbot URL when chatbot option is clicked', async () => {
    const openMock = vi.fn()
    vi.stubGlobal('open', openMock)

    const { user } = render(<PostAgentActions {...defaultProps} />)

    await user.click(screen.getByLabelText(/read with ai chatbot/i))
    await user.click(screen.getByText(/read with chatgpt/i))

    expect(openMock).toHaveBeenCalledWith(
      expect.stringContaining('chatgpt.com'),
      '_blank',
      'noopener,noreferrer',
    )
  })
})
