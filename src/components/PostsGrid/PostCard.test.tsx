import MockData from '@MockData';
import React from 'react';
import { create } from 'react-test-renderer';
import PostCard from './PostCard';

describe('PostCard', () => {
  const mockBasePost = MockData.basePosts[0];
  const mockPost = MockData.posts[0];

  test('should render correctly (snapshot)', () => {
    const tree = create(<PostCard post={mockPost} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render correctly with partial data (snapshot)', () => {
    const tree = create(<PostCard post={mockBasePost} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
