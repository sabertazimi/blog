import Blockquote from './Blockquote'
import { render } from '@/utils'

describe('Blockquote', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<Blockquote>Blockquote</Blockquote>)

    expect(container).toMatchSnapshot()
  })
})
