import mockData from '@/mocks/data'
import { render } from '@/utils'
import ArticleNav from './ArticleNav'

describe('ArticleNav', () => {
  const mockBasePost = mockData.basePosts[0]
  const mockPost = mockData.posts[0]

  it('should render correctly (snapshot)', () => {
    const { container } = render(<ArticleNav prevPost={mockPost.prevPost} nextPost={mockPost.nextPost} />)

    expect(container).toMatchSnapshot()
  })

  it('should render correctly with partial data (snapshot)', () => {
    const { container } = render(<ArticleNav prevPost={mockBasePost.prevPost} nextPost={mockBasePost.nextPost} />)

    expect(container).toMatchSnapshot()
  })
})
