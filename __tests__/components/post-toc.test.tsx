import type { TOCItemType } from '@/components/post-toc'
import { describe, expect, it, vi } from 'vitest'
import { getItemOffset, getLineOffset, PostMainTOC, PostMobileTOC } from '@/components/post-toc'
import { render, screen } from '@/tests/test-utils'

describe('Pure Functions', () => {
  describe('getItemOffset', () => {
    it('should return 14 for depth 0', () => {
      expect(getItemOffset(0)).toBe(14)
    })

    it('should return 14 for depth 1', () => {
      expect(getItemOffset(1)).toBe(14)
    })

    it('should return 26 for depth 2', () => {
      expect(getItemOffset(2)).toBe(26)
    })

    it('should return 36 for depth 3', () => {
      expect(getItemOffset(3)).toBe(36)
    })

    it('should return 36 for depth 4', () => {
      expect(getItemOffset(4)).toBe(36)
    })

    it('should return 36 for any depth greater than 2', () => {
      expect(getItemOffset(5)).toBe(36)
      expect(getItemOffset(10)).toBe(36)
      expect(getItemOffset(100)).toBe(36)
    })

    it('should handle negative depth', () => {
      expect(getItemOffset(-1)).toBe(14)
      expect(getItemOffset(-10)).toBe(14)
    })
  })

  describe('getLineOffset', () => {
    it('should return 0 for depth 0', () => {
      expect(getLineOffset(0)).toBe(0)
    })

    it('should return 0 for depth 1', () => {
      expect(getLineOffset(1)).toBe(0)
    })

    it('should return 10 for depth 2', () => {
      expect(getLineOffset(2)).toBe(10)
    })

    it('should return 10 for depth 3', () => {
      expect(getLineOffset(3)).toBe(10)
    })

    it('should return 10 for any depth >= 2', () => {
      expect(getLineOffset(4)).toBe(10)
      expect(getLineOffset(5)).toBe(10)
      expect(getLineOffset(100)).toBe(10)
    })

    it('should handle negative depth', () => {
      expect(getLineOffset(-1)).toBe(0)
      expect(getLineOffset(-10)).toBe(0)
    })
  })
})

describe('PostMainTOC', () => {
  const mockToc: TOCItemType[] = [
    { title: 'Introduction', url: '#introduction', depth: 1 },
    { title: 'Getting Started', url: '#getting-started', depth: 1 },
    { title: 'Installation', url: '#installation', depth: 2 },
  ]

  it('should render "On this page" heading', () => {
    render(<PostMainTOC toc={mockToc} />)

    expect(screen.getByText('On this page')).toBeInTheDocument()
  })

  it('should render all TOC items', () => {
    render(<PostMainTOC toc={mockToc} />)

    expect(screen.getByText('Introduction')).toBeInTheDocument()
    expect(screen.getByText('Getting Started')).toBeInTheDocument()
    expect(screen.getByText('Installation')).toBeInTheDocument()
  })

  it('should render TOC items as links', () => {
    render(<PostMainTOC toc={mockToc} />)

    const introLink = screen.getByRole('link', { name: 'Introduction' })
    expect(introLink).toHaveAttribute('href', '#introduction')
  })

  it('should render empty state when no TOC items', () => {
    render(<PostMainTOC toc={[]} />)

    expect(screen.getByText('On this page')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<PostMainTOC toc={mockToc} className="custom-toc" />)

    const tocContainer = screen.getByTestId('post-main-toc')
    expect(tocContainer).toHaveClass('custom-toc')
  })

  it('should render TOC with single active anchor mode', () => {
    render(<PostMainTOC toc={mockToc} single />)

    expect(screen.getByText('Introduction')).toBeInTheDocument()
  })

  it('should handle TOC items with different depths', () => {
    const deepToc: TOCItemType[] = [
      { title: 'Level 1', url: '#level-1', depth: 1 },
      { title: 'Level 2', url: '#level-2', depth: 2 },
      { title: 'Level 3', url: '#level-3', depth: 3 },
    ]

    render(<PostMainTOC toc={deepToc} />)

    expect(screen.getByText('Level 1')).toBeInTheDocument()
    expect(screen.getByText('Level 2')).toBeInTheDocument()
    expect(screen.getByText('Level 3')).toBeInTheDocument()
  })

  it('should scroll to the active anchor when clicked', async () => {
    // Mock DOM element for the target heading
    const mockElement = document.createElement('h2')
    mockElement.id = 'introduction'
    document.body.appendChild(mockElement)

    // Mock getBoundingClientRect
    mockElement.getBoundingClientRect = vi.fn(() => ({
      top: 500,
      bottom: 550,
      left: 0,
      right: 0,
      width: 100,
      height: 50,
      x: 0,
      y: 500,
      toJSON: () => ({}),
    }))

    const { user } = render(<PostMainTOC toc={mockToc} />)

    const introLink = screen.getByRole('link', { name: 'Introduction' })
    await user.click(introLink)

    expect(window.scrollTo).toHaveBeenCalledTimes(1)
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: expect.any(Number) as number,
      behavior: 'smooth',
    })

    // Cleanup
    document.body.removeChild(mockElement)
  })
})

describe('PostMobileTOC', () => {
  const mockToc: TOCItemType[] = [
    { title: 'Introduction', url: '#introduction', depth: 1 },
    { title: 'Getting Started', url: '#getting-started', depth: 1 },
  ]

  it('should not render when TOC is empty', () => {
    render(<PostMobileTOC toc={[]} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should render collapsible trigger with title', () => {
    render(<PostMobileTOC toc={mockToc} />)

    expect(screen.getByText('On this page')).toBeInTheDocument()
  })

  it('should render custom title when provided', () => {
    render(<PostMobileTOC toc={mockToc} title="Table of Contents" />)

    expect(screen.getByText('Table of Contents')).toBeInTheDocument()
  })

  it('should render collapsible trigger button', () => {
    render(<PostMobileTOC toc={mockToc} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should toggle TOC items visibility when trigger is clicked', async () => {
    const { user } = render(<PostMobileTOC toc={mockToc} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByRole('link', { name: 'Introduction' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Getting Started' })).toBeInTheDocument()
  })

  it('should render progress circle in trigger', () => {
    render(<PostMobileTOC toc={mockToc} />)

    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toBeInTheDocument()
  })

  it('should handle single active anchor mode', () => {
    render(<PostMobileTOC toc={mockToc} single />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
