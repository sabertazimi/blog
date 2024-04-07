import { render } from '@utils'
import BooksGrid from './BooksGrid'

describe('BooksGrid', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<BooksGrid />)

    expect(container).toMatchSnapshot()
  })
})
