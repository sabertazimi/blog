import mockData from '@mocks/data';
import { render, waitFor } from '@utils';
import Header from './Header';

describe('Header', () => {
  const mockPosts = mockData.posts;

  test('should render correctly (snapshot)', async () => {
    const { container } = render(<Header posts={mockPosts} />);

    await waitFor(() => expect(container).toMatchSnapshot());
  });
});
