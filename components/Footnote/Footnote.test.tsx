import { render } from '@utils'
import Footnote from './Footnote'

describe('footnote', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<Footnote />)

    expect(container).toMatchSnapshot()
  })
})
