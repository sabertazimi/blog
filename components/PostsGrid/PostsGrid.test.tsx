import mockData from '@mocks/data';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import PostsGrid from './PostsGrid';

describe('PostsGrid', () => {
  const mockPosts = mockData.posts;

  test('should render correctly (snapshot)', () => {
    const { container } = render(<PostsGrid posts={mockPosts} />);

    expect(container).toMatchSnapshot();
  });

  test('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<PostsGrid posts={mockPosts} />);

    const a11y = await axe(container, {
      rules: {
        'empty-heading': { enabled: false },
        'nested-interactive': { enabled: false },
      },
    });

    expect(a11y).toHaveNoViolations();
  });
});
