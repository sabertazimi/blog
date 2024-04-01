import { render } from '@utils'
import { axe } from 'jest-axe'
import BooksGrid from './BooksGrid'

describe('BooksGrid', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<BooksGrid />)

    expect(container).toMatchSnapshot()
  })

  it('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<BooksGrid />)

    const a11y = await axe(container)

    expect(a11y).toHaveNoViolations()
  })
})
