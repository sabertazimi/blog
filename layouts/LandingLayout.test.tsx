import { render } from '@utils'
import LandingLayout from './LandingLayout'

describe('LandingLayout', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(
      <LandingLayout>
        <div>LandingLayout</div>
      </LandingLayout>
    )

    expect(container).toMatchSnapshot()
  })
})
