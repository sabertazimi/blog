import ThemeSwitch from './ThemeSwitch'
import { fireEvent, render, screen } from '@/utils'

describe('ThemeSwitch', () => {
  it('should switch dark mode when clicked', () => {
    const { container } = render(<ThemeSwitch />)

    fireEvent.click(screen.getByTestId('toggle-wrapper'))

    expect(container).toMatchSnapshot()
  })
})
