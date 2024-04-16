import PostsGrid from './PostsGrid'
import mockData from '@/mocks/data'
import { render } from '@/utils'

describe('PostsGrid', () => {
  const mockPosts = mockData.posts

  it('should render correctly (snapshot)', () => {
    const { container } = render(<PostsGrid posts={mockPosts} />)

    expect(container).toMatchSnapshot()
  })
})
