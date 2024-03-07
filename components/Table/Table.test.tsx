import { render } from '@utils'
import Table from './Table'

describe('Table', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<Table />)

    expect(container).toMatchSnapshot()
  })
})
