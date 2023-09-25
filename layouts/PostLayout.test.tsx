import mockData from '@mocks/data';
import { render, waitFor } from '@utils';
import PostLayout from './PostLayout';

describe('PostLayout', () => {
  const mockTime = mockData.time;
  const mockPosts = mockData.posts;

  test('should render correctly (snapshot)', async () => {
    const { container } = render(
      <PostLayout banner="post layout" buildTime={mockTime} posts={mockPosts}>
        <div>PostLayout</div>
      </PostLayout>
    );

    await waitFor(() => expect(container).toMatchSnapshot());
  });
});
