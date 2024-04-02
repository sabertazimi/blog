import mockData from '@mocks/data'
import { render, waitFor } from '@utils'
import PostLayout from './PostLayout'

describe('PostLayout', () => {
  const mockTime = mockData.time
  const mockPosts = mockData.posts

  it('should render correctly (snapshot)', async () => {
    const { container } = render(
      <PostLayout banner="post layout" buildTime={mockTime} posts={mockPosts}>
        <div>PostLayout</div>
      </PostLayout>,
    )

    // eslint-disable-next-line testing-library/no-wait-for-snapshot -- Wait for the snapshot to be taken.
    await waitFor(() => expect(container).toMatchSnapshot())
  })
})
