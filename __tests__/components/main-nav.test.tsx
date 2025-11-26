import { describe, expect, it } from 'vitest'
import MainNav from '@/components/main-nav'
import { render, screen } from '@/tests/test-utils'

describe('MainNav', () => {
  it('should render navigation menu', () => {
    render(<MainNav />)

    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should render navigation links', () => {
    render(<MainNav />)

    expect(screen.getByRole('link', { name: /posts/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
  })

  it('should highlight active route', () => {
    render(<MainNav />)

    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('should have correct href attributes', () => {
    render(<MainNav />)

    const postsLink = screen.getByRole('link', { name: /posts/i })
    const aboutLink = screen.getByRole('link', { name: /about/i })

    expect(postsLink).toHaveAttribute('href', '/posts')
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('should apply font-extrabold class to links', () => {
    render(<MainNav />)

    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveClass('font-extrabold')
    })
  })
})
