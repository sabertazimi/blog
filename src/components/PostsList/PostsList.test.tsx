import React from 'react';
import { create } from 'react-test-renderer';
import PostsList from './PostsList';

const basePosts = Array.from(Array(5).keys()).map((post) => ({
  slug: `/${post}BasicNotes/`,
  timeToRead: post,
  title: `${post} Basic Notes`,
}));
const posts = basePosts.map((post, index) => ({
  ...post,
  subtitle: 'Be a Stupid Learner',
  author: 'Sabertaz',
  date: '2018-08-08T00:00:00.000Z',
  tags: ['JavaScript', 'Frontend Development', 'Web Development'],
  prevPost: {
    slug: `/${index}BasicNotes/`,
    title: `${index} Basic Notes`,
  },
  nextPost: {
    slug: `/${index} AdvancedNotes/`,
    title: `${index} Advanced Notes`,
  },
}));

describe('PostsList', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(<PostsList posts={posts} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
