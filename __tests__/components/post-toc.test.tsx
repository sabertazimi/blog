import type { TOCItemType } from '@/components/post-toc'
import { describe, expect, it } from 'vitest'
import { PostMainTOC, PostMobileTOC } from '@/components/post-toc'
import { render, screen } from '@/tests/test-utils'

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
})
