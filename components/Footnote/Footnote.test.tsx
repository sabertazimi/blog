import { render } from '@utils'
import Footnote from './Footnote'

describe('Footnote', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<Footnote />)

    expect(container).toMatchSnapshot()
  })
})
