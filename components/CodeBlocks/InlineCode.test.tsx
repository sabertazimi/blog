import InlineCode from './InlineCode'
import { render } from '@/utils'

describe('InlineCode', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<InlineCode>Inline Code</InlineCode>)

    expect(container).toMatchSnapshot()
  })
})
