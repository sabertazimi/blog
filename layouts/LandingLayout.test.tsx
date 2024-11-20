import { render } from '@/utils'
import LandingLayout from './LandingLayout'

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
