import { render, screen } from '@utils'
import Container from './Container'

describe('Container', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(
      <Container role="main">
        <h1>Container</h1>
      </Container>,
    )

    expect(container).toMatchSnapshot()
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
