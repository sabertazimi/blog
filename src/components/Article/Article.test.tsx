import React from 'react';
import { create } from 'react-test-renderer';
import Article from './Article';

const commentUrl = 'https://example.com';
const socialUrl = 'https://example.com';
const basePost = {
  slug: '/reduxBasicNotes/',
  timeToRead: 8,
  excerpt: 'Redux Basic Notes Basic Concepts',
  html: '<h1>Redux Basic Notes</h1>',
};
const post = {
  ...basePost,
  title: 'Redux Basic Notes',
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

describe('Article', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(
      <Article post={post} commentUrl={commentUrl} socialUrl={socialUrl} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render correctly without partial data (snapshot)', () => {
    const tree = create(
      <Article post={basePost} commentUrl={commentUrl} socialUrl={socialUrl} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
