import { fireEvent, render, screen } from '@/utils'
import ThemeSwitch from './ThemeSwitch'

describe('ThemeSwitch', () => {
  it('should switch dark mode when clicked', () => {
    const { container } = render(<ThemeSwitch />)

    // eslint-disable-next-line testing-library/no-node-access -- allow fire click event
    fireEvent.click(screen.getByTestId('toggle-wrapper'))

    expect(container).toMatchSnapshot()
  })
})
