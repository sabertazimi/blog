import mockData from '@mocks/data'
import { render } from '@utils'
import { axe } from 'jest-axe'
import PostsList from './PostsList'

describe('PostsList', () => {
  const mockPosts = mockData.posts

  test('should render correctly (snapshot)', () => {
    const { container } = render(<PostsList posts={mockPosts} />)

    expect(container).toMatchSnapshot()
  })

  test('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<PostsList posts={mockPosts} />)

    const a11y = await axe(container)

    expect(a11y).toHaveNoViolations()
  })
})
