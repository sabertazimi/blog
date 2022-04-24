import MockData from '@mocks/data';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { create } from 'react-test-renderer';
import ArticleComments from './ArticleComments';

describe('ArticleComments', () => {
  const mockUrl = MockData.siteMetadata.disqusUrl;

  test('should render correctly (snapshot)', () => {
    const tree = create(<ArticleComments url={mockUrl} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<ArticleComments url={mockUrl} />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });
});
