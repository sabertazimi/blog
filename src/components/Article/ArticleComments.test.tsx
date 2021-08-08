import React from 'react';
import { create } from 'react-test-renderer';
import ArticleComments from './ArticleComments';

const commentUrl = 'https://example.com';

describe('ArticleComments', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(<ArticleComments url={commentUrl} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
