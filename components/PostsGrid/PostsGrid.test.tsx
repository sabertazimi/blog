import mockData from '@mocks/data'
import { render } from '@utils'
import PostsGrid from './PostsGrid'

describe('PostsGrid', () => {
  const mockPosts = mockData.posts

  test('should render correctly (snapshot)', () => {
    const { container } = render(<PostsGrid posts={mockPosts} />)

    expect(container).toMatchSnapshot()
  })
})
