import mockData from '@mocks/data';
import { render } from '@testing-library/react';
import PostsGrid from './PostsGrid';

describe('PostsGrid', () => {
  const mockPosts = mockData.posts;

  test('should render correctly (snapshot)', () => {
    const { container } = render(<PostsGrid posts={mockPosts} />);

    expect(container).toMatchSnapshot();
  });
});
