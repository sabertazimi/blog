import { describe, expect, it } from 'vitest'
import { SiteHeader } from '@/components/site-header'
import { mockMetadata } from '@/tests/fixtures/test-data'
import { render, screen } from '@/tests/test-utils'

describe('SiteHeader', () => {
  it('should render header element', () => {
    render(<SiteHeader metadata={mockMetadata} />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('should render logo link', () => {
    render(<SiteHeader metadata={mockMetadata} />)

    const logoLink = screen.getByRole('link', { name: /sabertaz blog/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('should render logo image', () => {
    render(<SiteHeader metadata={mockMetadata} />)

    const logo = screen.getByAltText(/sabertaz blog/i)
    expect(logo).toBeInTheDocument()
  })

  it('should render navigation menu', () => {
    render(<SiteHeader metadata={mockMetadata} />)

    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should render search button', () => {
    render(<SiteHeader metadata={mockMetadata} />)

    const searchButtons = screen.getAllByRole('button', { name: /search/i })
    expect(searchButtons.length).toBeGreaterThan(0)
  })

  it('should render language switcher', () => {
    render(<SiteHeader metadata={mockMetadata} />)

    const langButton = screen.getByRole('button', { name: /select language/i })
    expect(langButton).toBeInTheDocument()
  })

  it('should render theme toggler', () => {
    render(<SiteHeader metadata={mockMetadata} />)

    const themeButton = screen.getByRole('button', { name: /toggle theme/i })
    expect(themeButton).toBeInTheDocument()
  })
})
