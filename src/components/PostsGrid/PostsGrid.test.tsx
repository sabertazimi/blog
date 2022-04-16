import MockData from '@mocks/data';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { create } from 'react-test-renderer';
import PostsGrid from './PostsGrid';

describe('PostsGrid', () => {
  const mockPosts = MockData.posts;

  test('should render correctly (snapshot)', () => {
    const tree = create(<PostsGrid posts={mockPosts} />).toJSON();

    expect(tree).toMatchSnapshot();
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
