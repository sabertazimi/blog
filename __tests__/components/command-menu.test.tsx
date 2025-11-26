import { describe, expect, it } from 'vitest'
import CommandMenu from '@/components/command-menu'
import { mockMetadata } from '@/tests/fixtures/test-data'
import { render, screen } from '@/tests/test-utils'

describe('CommandMenu', () => {
  it('should render search buttons', () => {
    render(<CommandMenu metadata={mockMetadata} />)

    const buttons = screen.getAllByRole('button', { name: /search/i })
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should show keyboard shortcuts hint', () => {
    render(<CommandMenu metadata={mockMetadata} />)

    const kbd = screen.getByText('⌘')
    expect(kbd).toBeInTheDocument()
    expect(screen.getByText('K')).toBeInTheDocument()
  })

  it('should have search label', () => {
    render(<CommandMenu metadata={mockMetadata} />)

    const buttons = screen.getAllByRole('button', { name: /search/i })
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-label', 'Search posts and tags')
    })
  })
})
