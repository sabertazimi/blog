import Layout from './Layout'
import mockData from '@/mocks/data'
import { render, waitFor } from '@/utils'

describe('Layout', () => {
  const mockTime = mockData.time
  const mockPosts = mockData.posts

  it('should render correctly (snapshot)', async () => {
    const { container } = render(
      <Layout banner="layout" buildTime={mockTime} posts={mockPosts}>
        <div>Layout</div>
      </Layout>,
    )

    // eslint-disable-next-line testing-library/no-wait-for-snapshot -- Wait for the snapshot to be taken.
    await waitFor(() => expect(container).toMatchSnapshot())
  })
})
