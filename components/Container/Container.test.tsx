import { axe } from 'jest-axe'
import Container from './Container'
import { render, screen } from '@/utils'

describe('Container', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(
      <Container role="main">
        <h1>Container</h1>
      </Container>,
    )

    expect(container).toMatchSnapshot()
  })

  it('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(
      <Container role="main">
        <h1>Container</h1>
      </Container>,
    )

    const a11y = await axe(container)

    expect(a11y).toHaveNoViolations()
  })

  it('should render children correctly', () => {
    render(
      <Container role="main">
        <h1>Container</h1>
      </Container>,
    )

    expect(screen.getByRole('main')).toContainElement(
      screen.getByText('Container'),
    )
  })
})
