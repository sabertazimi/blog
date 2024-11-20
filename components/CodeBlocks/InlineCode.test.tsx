import { render } from '@/utils'
import InlineCode from './InlineCode'

describe('InlineCode', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<InlineCode>Inline Code</InlineCode>)

    expect(container).toMatchSnapshot()
  })
})
