import { render } from '@utils'
import MetaHeader from './MetaHeader'

describe('MetaHeader', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<MetaHeader />)

    expect(container).toMatchSnapshot()
  })
})
