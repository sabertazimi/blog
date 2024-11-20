import { render } from '@/utils'
import Switch from './Switch'

describe('Switch', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<Switch />)

    expect(container).toMatchSnapshot()
  })
})
