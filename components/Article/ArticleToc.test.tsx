import { render } from '@utils'
import ArticleToc from './ArticleToc'

describe('articleToc', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<ArticleToc slug="slug" />)

    expect(container).toMatchSnapshot()
  })
})
