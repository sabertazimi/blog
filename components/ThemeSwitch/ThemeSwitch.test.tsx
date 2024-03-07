import { fireEvent, render, screen } from '@utils'
import ThemeSwitch from './ThemeSwitch'

describe('ThemeSwitch', () => {
  test('should switch dark mode when clicked', () => {
    const { container } = render(<ThemeSwitch />)

    fireEvent.click(screen.getByTestId('toggle-wrapper'))

    expect(container).toMatchSnapshot()
  })
})
