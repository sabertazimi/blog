import { render } from '@utils'
import NotFoundResult from './NotFoundResult'

describe('NotFoundResult', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<NotFoundResult />)

    expect(container).toMatchSnapshot()
  })
})
