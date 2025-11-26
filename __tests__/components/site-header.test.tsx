import { describe, expect, it } from 'vitest'
import Header from '@/components/site-header'
import { mockMetadata } from '@/tests/fixtures/test-data'
import { render, screen } from '@/tests/test-utils'

describe('SiteHeader', () => {
  it('should render header element', () => {
    render(<Header metadata={mockMetadata} />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('should render logo link', () => {
    render(<Header metadata={mockMetadata} />)

    const logoLink = screen.getByRole('link', { name: /sabertaz blog/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('should render logo image', () => {
    render(<Header metadata={mockMetadata} />)

    const logo = screen.getByAltText(/sabertaz blog/i)
    expect(logo).toBeInTheDocument()
  })

  it('should render navigation menu', () => {
    render(<Header metadata={mockMetadata} />)

    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should render search button', () => {
    render(<Header metadata={mockMetadata} />)

    const searchButtons = screen.getAllByRole('button', { name: /search/i })
    expect(searchButtons.length).toBeGreaterThan(0)
  })

  it('should render language switcher', () => {
    render(<Header metadata={mockMetadata} />)

    const langButton = screen.getByRole('button', { name: /select language/i })
    expect(langButton).toBeInTheDocument()
  })

  it('should render theme toggler', () => {
    render(<Header metadata={mockMetadata} />)

    const themeButton = screen.getByRole('button', { name: /toggle theme/i })
    expect(themeButton).toBeInTheDocument()
  })
})
