import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { create } from 'react-test-renderer';
import ArticleComments from './ArticleComments';

const commentUrl = 'https://example.com';

describe('ArticleComments', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(<ArticleComments url={commentUrl} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<ArticleComments url={commentUrl} />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
