import NotFoundResult from './NotFoundResult'
import { render } from '@/utils'

describe('NotFoundResult', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<NotFoundResult />)

    expect(container).toMatchSnapshot()
  })
})
