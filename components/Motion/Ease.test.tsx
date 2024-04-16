import Ease from './Ease'
import { render } from '@/utils'

describe('Ease', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(
      <Ease>
        <div>Ease</div>
      </Ease>,
    )

    expect(container).toMatchSnapshot()
  })
})
