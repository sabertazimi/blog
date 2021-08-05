import React from 'react';
import renderer from 'react-test-renderer';
import Article from './Article';

describe('Article', () => {
  const commentUrl = 'https://example.com';
  const socialUrl = 'https://example.com';
  const post = {
    slug: '/reduxBasicNotes/',
    title: 'Redux Basic Notes',
    subtitle: 'Be a Stupid Learner',
    author: 'Sabertaz',
    tags: [
      'Redux',
      'React',
      'JavaScript',
      'Frontend Development',
      'Web Development',
    ],
    date: '2018-08-08T00:00:00.000Z',
    timeToRead: 8,
    excerpt: 'Redux Basic Notes Basic Concepts',
    toc: 'Redux Basic Notes ToC',
    html: '<h1>Redux Basic Notes</h1>',
    prevPost: {
      slug: '/javascriptBasicNotes/',
      title: 'JavaScript Basic Notes',
    },
    nextPost: {
      slug: '/javascriptAdvancedNotes/',
      title: 'JavaScript Advanced Notes',
    },
  };

  test('should render correctly (snapshot)', () => {
    const tree = renderer
      .create(
        <Article post={post} commentUrl={commentUrl} socialUrl={socialUrl} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
