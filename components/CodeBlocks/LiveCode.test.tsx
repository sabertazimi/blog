import LiveCode from './LiveCode'
import { render } from '@/utils'

describe('LiveCode', () => {
  it('should render live code correctly (snapshot)', () => {
    const { container } = render(
      <LiveCode language="typescript">const foo = bar();</LiveCode>,
    )

    expect(container).toMatchSnapshot()
  })
})
