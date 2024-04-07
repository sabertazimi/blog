import mockData from '@mocks/data'
import { render } from '@utils'
import PostsList from './PostsList'

describe('PostsList', () => {
  const mockPosts = mockData.posts

  it('should render correctly (snapshot)', () => {
    const { container } = render(<PostsList posts={mockPosts} />)

    expect(container).toMatchSnapshot()
  })
})
