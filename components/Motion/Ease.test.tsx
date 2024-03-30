import { render } from '@utils'
import Ease from './Ease'

describe('ease', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(
      <Ease>
        <div>Ease</div>
      </Ease>,
    )

    expect(container).toMatchSnapshot()
  })
})
