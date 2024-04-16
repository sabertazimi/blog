import Footnote from './Footnote'
import { render } from '@/utils'

describe('Footnote', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<Footnote />)

    expect(container).toMatchSnapshot()
  })
})
