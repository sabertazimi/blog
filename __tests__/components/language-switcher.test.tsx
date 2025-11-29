import { describe, expect, it, vi } from 'vitest'
import LanguageSwitcher from '@/components/language-switcher'
import { routing } from '@/i18n/routing'
import { mockPush } from '@/tests/mocks/navigation'
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

  it('should render correct number of language options', async () => {
    const { user } = render(<LanguageSwitcher />)

    const button = screen.getByRole('button', { name: /select language/i })
    await user.click(button)

    const options = screen.getAllByRole('menuitemradio')
    expect(options).toHaveLength(routing.locales.length)
    expect(screen.getByRole('menuitemradio', { name: /english/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitemradio', { name: /中文/ })).toBeInTheDocument()
  })

  it('should change language when different language option is clicked', async () => {
    vi.mocked(mockPush).mockClear()

    const { user } = render(<LanguageSwitcher />)

    const button = screen.getByRole('button', { name: /select language/i })
    await user.click(button)
    const zhCNOption = screen.getByRole('menuitemradio', { name: /中文/ })
    await user.click(zhCNOption)

    expect(mockPush).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith('/zh-CN', { locale: 'zh-CN' })
  })

  it('should not change language when same language option is clicked', async () => {
    vi.mocked(mockPush).mockClear()

    const { user } = render(<LanguageSwitcher />)

    const button = screen.getByRole('button', { name: /select language/i })
    await user.click(button)
    const enUSOption = screen.getByRole('menuitemradio', { name: /english/i })
    await user.click(enUSOption)

    expect(mockPush).not.toHaveBeenCalled()
  })
})
