import mockData from '@mocks/data'
import { render } from '@utils'
import PostsGrid from './PostsGrid'

describe('postsGrid', () => {
  const mockPosts = mockData.posts

  it('should render correctly (snapshot)', () => {
    const { container } = render(<PostsGrid posts={mockPosts} />)

    expect(container).toMatchSnapshot()
  })
})
