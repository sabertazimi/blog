import mockData from '@mocks/data'
import { render } from '@utils'
import PostCard from './PostCard'

describe('PostCard', () => {
  const mockBasePost = mockData.basePosts[0]
  const mockPost = mockData.posts[0]

  it('should render correctly (snapshot)', () => {
    const { container } = render(<PostCard post={mockPost} />)

    expect(container).toMatchSnapshot()
  })

  it('should render correctly with partial data (snapshot)', () => {
    const { container } = render(<PostCard post={mockBasePost} />)

    expect(container).toMatchSnapshot()
  })
})
