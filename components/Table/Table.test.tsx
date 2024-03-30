import { render } from '@utils'
import Table from './Table'

describe('table', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<Table />)

    expect(container).toMatchSnapshot()
  })
})
