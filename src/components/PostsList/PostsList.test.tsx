import MockData from '@MockData';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { create } from 'react-test-renderer';
import PostsList from './PostsList';

describe('PostsList', () => {
  const mockPosts = MockData.posts;

  test('should render correctly (snapshot)', () => {
    const tree = create(<PostsList posts={mockPosts} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<PostsList posts={mockPosts} />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });
});
