import mockData from '@mocks/data';
import { render } from '@utils';
import Article from './Article';

describe('Article', () => {
  const mockBasePost = mockData.basePosts[0];
  const mockPost = mockData.posts[0];

  test('should render correctly (snapshot)', () => {
    const { container } = render(<Article post={mockPost} />);

    expect(container).toMatchSnapshot();
  });

  test('should render correctly with partial data (snapshot)', () => {
    const { container } = render(<Article post={mockBasePost} />);

    expect(container).toMatchSnapshot();
  });
});
