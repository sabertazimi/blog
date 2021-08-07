import React from 'react';
import { create } from 'react-test-renderer';
import PostCard from './PostCard';

const basePost = {
  slug: '/reduxBasicNotes/',
  timeToRead: 8,
  title: 'Redux Basic Notes',
};
const post = {
  ...basePost,
  subtitle: 'Be a Stupid Learner',
  author: 'Sabertaz',
  date: '2018-08-08T00:00:00.000Z',
  tags: [
    'Redux',
    'React',
    'JavaScript',
    'Frontend Development',
    'Web Development',
  ],
  prevPost: {
    slug: '/javascriptBasicNotes/',
    title: 'JavaScript Basic Notes',
  },
  nextPost: {
    slug: '/javascriptAdvancedNotes/',
    title: 'JavaScript Advanced Notes',
  },
};

describe('PostCard', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(<PostCard post={post} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render correctly with partial data (snapshot)', () => {
    const tree = create(<PostCard post={basePost} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
