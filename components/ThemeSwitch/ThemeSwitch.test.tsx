import { fireEvent, render, screen } from '@utils'
import ThemeSwitch from './ThemeSwitch'

describe('themeSwitch', () => {
  it('should switch dark mode when clicked', () => {
    const { container } = render(<ThemeSwitch />)

    fireEvent.click(screen.getByTestId('toggle-wrapper'))

    expect(container).toMatchSnapshot()
  })
})
