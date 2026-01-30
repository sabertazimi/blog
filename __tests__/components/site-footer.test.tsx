import { describe, expect, it } from 'vitest'
import { SiteFooter } from '@/components/site-footer'
import { render, screen } from '@/tests/test-utils'

describe('SiteFooter', () => {
  const mockBuildTime = '2025-01-01T00:00:00.000Z'

  it('should render footer element', () => {
    render(<SiteFooter buildTime={mockBuildTime} />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('should render social media links', () => {
    render(<SiteFooter buildTime={mockBuildTime} />)

    const githubLink = screen.getByLabelText('GitHub')
    const xLink = screen.getByLabelText('X')

    expect(githubLink).toBeInTheDocument()
    expect(xLink).toBeInTheDocument()
  })

  it('should render copyright information', () => {
    render(<SiteFooter buildTime={mockBuildTime} />)

    const currentYear = new Date().getFullYear()
    const yearText = screen.getByText((content, element) => {
      return content.includes(currentYear.toString()) && element?.tagName.toLowerCase() === 'div'
    })
    expect(yearText).toBeInTheDocument()
  })

  it('should render build time', () => {
    render(<SiteFooter buildTime={mockBuildTime} />)

    const timeElement = screen.getByRole('time')
    expect(timeElement).toBeInTheDocument()
  })

  it('should have external links with correct attributes', () => {
    render(<SiteFooter buildTime={mockBuildTime} />)

    const externalLinks = screen.getAllByRole('link')
    externalLinks.forEach((link) => {
      if (link.getAttribute('href')?.startsWith('http')) {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      }
    })
  })
})
