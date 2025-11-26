import { describe, expect, it } from 'vitest'
import LanguageSwitcher from '@/components/language-switcher'
import { render, screen } from '@/tests/test-utils'

describe('LanguageSwitcher', () => {
  it('should render language switcher button', () => {
    render(<LanguageSwitcher />)

    const button = screen.getByRole('button', { name: /select language/i })
    expect(button).toBeInTheDocument()
  })

  it('should have correct aria attributes', () => {
    render(<LanguageSwitcher />)

    const button = screen.getByRole('button', { name: /select language/i })
    expect(button).toHaveAttribute('aria-label', 'Select Language')
  })

  it('should render language icon', () => {
    render(<LanguageSwitcher />)

    const button = screen.getByRole('button', { name: /select language/i })
    const icon = button.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })
})
