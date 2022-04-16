import MockData from '@MockData';
import React from 'react';
import { create } from 'react-test-renderer';
import PostsGrid from './PostsGrid';

describe('PostsGrid', () => {
  const mockPosts = MockData.posts;

  test('should render correctly (snapshot)', () => {
    const tree = create(<PostsGrid posts={mockPosts} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
