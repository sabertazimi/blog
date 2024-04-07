import { render } from '@utils'
import ArticleComments from './ArticleComments'

describe('ArticleComments', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<ArticleComments />)

    expect(container).toMatchSnapshot()
  })
})
