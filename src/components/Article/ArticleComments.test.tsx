import React from 'react';
import { create } from 'react-test-renderer';
import ArticleComments from './ArticleComments';

const commentUrl = 'https://example.com';

describe('ArticleComments', () => {
  beforeAll(() => {
    jest.spyOn(document, 'getElementById').mockImplementation((elementId) => {
      return document.createElement(`#${elementId}`);
    });
  });

  afterAll(() => {
    (document.getElementById as unknown as jest.SpyInstance).mockRestore();
  });

  test('should render correctly (snapshot)', () => {
    const tree = create(<ArticleComments url={commentUrl} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
