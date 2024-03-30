import { fireEvent, render, screen } from '@utils'
import Toggle from './Toggle'

describe('toggle', () => {
  const cases = [
    [false, false],
    [false, true],
    [true, false],
    [true, true],
  ]

  it.each(cases)(
    'should render animation correctly (snapshot)',
    (isToggled, shouldReduceMotion) => {
      const { container } = render(
        <Toggle
          isToggled={isToggled}
          onToggle={jest.fn()}
          iconClose={<div>Close</div>}
          iconOpen={<div>Open</div>}
          shouldReduceMotion={shouldReduceMotion}
        />,
      )

      expect(container).toMatchSnapshot()
    },
  )

  it('should invoke `onToggle` when clicked', () => {
    const mockToggle = jest.fn()

    render(
      <Toggle
        isToggled={false}
        onToggle={mockToggle}
        iconClose={<div>Close</div>}
        iconOpen={<div>Open</div>}
        shouldReduceMotion={false}
      />,
    )

    fireEvent.click(screen.getByTestId('toggle-wrapper'))

    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  it('should invoke `onToggle` when `Enter` key down', () => {
    const mockToggle = jest.fn()

    render(
      <Toggle
        isToggled={false}
        onToggle={mockToggle}
        iconClose={<div>Close</div>}
        iconOpen={<div>Open</div>}
        shouldReduceMotion={false}
      />,
    )

    fireEvent.keyDown(screen.getByTestId('toggle-wrapper'), { key: 'Enter' })

    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  it('should not invoke `onToggle` when `Tab` key down', () => {
    const mockToggle = jest.fn()

    render(
      <Toggle
        isToggled={false}
        onToggle={mockToggle}
        iconClose={<div>Close</div>}
        iconOpen={<div>Open</div>}
        shouldReduceMotion={false}
      />,
    )

    fireEvent.keyDown(screen.getByTestId('toggle-wrapper'), { key: 'Tab' })

    expect(mockToggle).not.toBeCalled()
  })
})
