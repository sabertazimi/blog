import mockData from '@mocks/data';
import { render, waitFor } from '@testing-library/react';
import PostLayout from './PostLayout';

describe('PostLayout', () => {
  const mockTime = mockData.time;
  const mockPosts = mockData.posts;

  test('should render correctly (snapshot)', () => {
    const { container } = render(
      <PostLayout banner="post layout" buildTime={mockTime} posts={mockPosts}>
        <div>PostLayout</div>
      </PostLayout>
    );

    waitFor(() => expect(container).toMatchSnapshot());
  });
});
