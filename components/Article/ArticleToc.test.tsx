import ArticleToc from './ArticleToc'
import { render } from '@/utils'

describe('ArticleToc', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<ArticleToc slug="slug" />)

    expect(container).toMatchSnapshot()
  })
})
