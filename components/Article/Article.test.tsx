import Article from './Article'
import mockData from '@/mocks/data'
import { render } from '@/utils'

describe('Article', () => {
  const mockBasePost = mockData.basePosts[0]
  const mockPost = mockData.posts[0]

  it('should render correctly (snapshot)', () => {
    const { container } = render(<Article post={mockPost} />)

    expect(container).toMatchSnapshot()
  })

  it('should render correctly with partial data (snapshot)', () => {
    const { container } = render(<Article post={mockBasePost} />)

    expect(container).toMatchSnapshot()
  })
})
