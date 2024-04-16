import Switch from './Switch'
import { render } from '@/utils'

describe('Switch', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<Switch />)

    expect(container).toMatchSnapshot()
  })
})
