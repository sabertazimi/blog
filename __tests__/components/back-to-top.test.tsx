import { describe, expect, it, vi } from 'vitest'
import BackToTop from '@/components/back-to-top'
import { fireEvent, render, screen, waitFor } from '@/tests/test-utils'

describe('BackToTop', () => {
  it('should not be visible initially when scrollTop is less than minHeight', () => {
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 0,
    })

    render(<BackToTop />)

    const button = screen.getByLabelText(/back to top/i)
    expect(button).toHaveClass('opacity-0')
    expect(button).toHaveAttribute('aria-hidden', 'true')
    expect(button).toHaveAttribute('tabIndex', '-1')
  })

  it('should be visible when scrollTop exceeds minHeight', () => {
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 400,
    })

    render(<BackToTop minHeight={300} />)

    const button = screen.getByRole('button', { name: /back to top/i })
    expect(button).toHaveClass('opacity-100')
    expect(button).toHaveAttribute('aria-hidden', 'false')
    expect(button).toHaveAttribute('tabIndex', '0')
  })

  it('should scroll to top when clicked', () => {
    const scrollToMock = vi.fn()
    window.scrollTo = scrollToMock

    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 400,
    })

    render(<BackToTop />)

    const button = screen.getByRole('button', { name: /back to top/i })
    fireEvent.click(button)

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })

  it('should scroll to custom scrollTo position', () => {
    const scrollToMock = vi.fn()
    window.scrollTo = scrollToMock

    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 400,
    })

    render(<BackToTop scrollTo={100} />)

    const button = screen.getByRole('button', { name: /back to top/i })
    fireEvent.click(button)

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 100,
      behavior: 'smooth',
    })
  })

  it('should update visibility on scroll', async () => {
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 0,
    })

    render(<BackToTop minHeight={300} />)

    const button = screen.getByLabelText(/back to top/i)
    expect(button).toHaveClass('opacity-0')

    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 400,
    })

    fireEvent.scroll(document)

    await waitFor(() => {
      expect(button).toHaveClass('opacity-100')
    })
  })

  it('should apply custom className', () => {
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 400,
    })

    render(<BackToTop className="custom-class" />)

    const button = screen.getByRole('button', { name: /back to top/i })
    expect(button).toHaveClass('custom-class')
  })
})
