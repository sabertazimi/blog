import mockData from '@mocks/data';
import { render, waitFor } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  const mockPosts = mockData.posts;

  test('should render correctly (snapshot)', () => {
    const { container } = render(<Header posts={mockPosts} />);

    waitFor(() => expect(container).toMatchSnapshot());
  });
});
