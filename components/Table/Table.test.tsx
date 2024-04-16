import Table from './Table'
import { render } from '@/utils'

describe('Table', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<Table />)

    expect(container).toMatchSnapshot()
  })
})
