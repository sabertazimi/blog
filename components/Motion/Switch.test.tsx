import { render } from '@utils'
import Switch from './Switch'

describe('switch', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<Switch />)

    expect(container).toMatchSnapshot()
  })
})
