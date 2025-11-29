import { describe, expect, it, vi } from 'vitest'
import MobileNav from '@/components/mobile-nav'
import { usePathname } from '@/tests/mocks/navigation'
import { render, screen, waitFor } from '@/tests/test-utils'

describe('MobileNav', () => {
  it('should render menu toggle button', () => {
    render(<MobileNav />)

    const button = screen.getByRole('button', { name: /open menu/i })
    expect(button).toBeInTheDocument()
  })

  it('should toggle menu when button is clicked', async () => {
    const { user } = render(<MobileNav />)

    const button = screen.getByRole('button', { name: /open menu/i })
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()
    })
  })

  it('should render navigation links when menu is open', async () => {
    const { user } = render(<MobileNav />)

    const button = screen.getByRole('button', { name: /open menu/i })
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /posts/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    })
  })

  it('should close menu when a link is clicked', async () => {
    const { user } = render(<MobileNav />)

    const button = screen.getByRole('button', { name: /open menu/i })
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /posts/i })).toBeInTheDocument()
    })

    const postsLink = screen.getByRole('link', { name: /posts/i })
    await user.click(postsLink)

    await waitFor(() => {
      expect(screen.queryByRole('link', { name: /posts/i })).not.toBeInTheDocument()
    })
  })

  it('should have correct href attributes', async () => {
    const { user } = render(<MobileNav />)

    const button = screen.getByRole('button', { name: /open menu/i })
    await user.click(button)

    await waitFor(() => {
      const postsLink = screen.getByRole('link', { name: /posts/i })
      const aboutLink = screen.getByRole('link', { name: /about/i })

      expect(postsLink).toHaveAttribute('href', '/posts')
      expect(aboutLink).toHaveAttribute('href', '/about')
    })
  })

  it('should highlight active route', async () => {
    vi.mocked(usePathname).mockReturnValue('/posts')

    const { user } = render(<MobileNav />)

    const button = screen.getByRole('button', { name: /open menu/i })
    await user.click(button)

    await waitFor(() => {
      const postsLink = screen.getByRole('link', { name: /posts/i })
      const aboutLink = screen.getByRole('link', { name: /about/i })

      expect(postsLink).toHaveClass('text-accent-foreground bg-accent')
      expect(aboutLink).not.toHaveClass('bg-accent')
    })
  })
})
