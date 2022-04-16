import MockData from '@MockData';
import React from 'react';
import { create } from 'react-test-renderer';
import PostsList from './PostsList';

describe('PostsList', () => {
  const mockPosts = MockData.posts;

  test('should render correctly (snapshot)', () => {
    const tree = create(<PostsList posts={mockPosts} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
