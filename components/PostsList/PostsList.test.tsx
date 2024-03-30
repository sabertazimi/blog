import mockData from '@mocks/data'
import { render } from '@utils'
import { axe } from 'jest-axe'
import PostsList from './PostsList'

describe('postsList', () => {
  const mockPosts = mockData.posts

  it('should render correctly (snapshot)', () => {
    const { container } = render(<PostsList posts={mockPosts} />)

    expect(container).toMatchSnapshot()
  })

  it('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<PostsList posts={mockPosts} />)

    const a11y = await axe(container)

    expect(a11y).toHaveNoViolations()
  })
})
