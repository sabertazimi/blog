import LandingLayout from './LandingLayout'
import { render } from '@/utils'

describe('LandingLayout', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(
      <LandingLayout>
        <div>LandingLayout</div>
      </LandingLayout>,
    )

    expect(container).toMatchSnapshot()
  })
})
