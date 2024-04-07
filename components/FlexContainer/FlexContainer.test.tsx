import { render, screen } from '@utils'
import FlexContainer from './FlexContainer'

describe('FlexContainer', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(
      <FlexContainer role="main">
        <h1>FlexContainer</h1>
      </FlexContainer>,
    )

    expect(container).toMatchSnapshot()
  })

  it('should render children correctly', () => {
    render(
      <FlexContainer role="main">
        <h1>FlexContainer</h1>
      </FlexContainer>,
    )

    expect(screen.getByRole('main')).toContainElement(
      screen.getByText('FlexContainer'),
    )
  })
})
