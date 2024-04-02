import mockData from '@mocks/data'
import { render, waitFor } from '@utils'
import Header from './Header'

describe('Header', () => {
  const mockPosts = mockData.posts

  it('should render correctly (snapshot)', async () => {
    const { container } = render(<Header posts={mockPosts} />)

    // eslint-disable-next-line testing-library/no-wait-for-snapshot -- Wait for the snapshot to be taken.
    await waitFor(() => expect(container).toMatchSnapshot())
  })
})
