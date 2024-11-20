import mockData from '@/mocks/data'
import { render } from '@/utils'
import ArticleHeader from './ArticleHeader'

describe('ArticleHeader', () => {
  const mockBasePost = mockData.basePosts[0]
  const mockPost = mockData.posts[0]

  it('should render correctly (snapshot)', () => {
    const { container } = render(<ArticleHeader post={mockPost} />)

    expect(container).toMatchSnapshot()
  })

  it('should render correctly with partial data (snapshot)', () => {
    const { container } = render(<ArticleHeader post={mockBasePost} />)

    expect(container).toMatchSnapshot()
  })
})
