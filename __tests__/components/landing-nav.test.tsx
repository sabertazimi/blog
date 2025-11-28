import { describe, expect, it } from 'vitest'
import LandingNav from '@/components/landing-nav'
import { render, screen } from '@/tests/test-utils'

describe('LandingNav', () => {
  it('should render navigation links', () => {
    render(<LandingNav />)

    const postsLink = screen.getByRole('link', { name: /posts/i })
    const aboutLink = screen.getByRole('link', { name: /about/i })

    expect(postsLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
  })

  it('should have correct href attributes', () => {
    render(<LandingNav />)

    const postsLink = screen.getByRole('link', { name: /posts/i })
    const aboutLink = screen.getByRole('link', { name: /about/i })

    expect(postsLink).toHaveAttribute('href', '/posts')
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('should render theme toggler button', () => {
    render(<LandingNav />)

    const themeButton = screen.getByRole('button', { name: /toggle theme/i })
    expect(themeButton).toBeInTheDocument()
  })
})
