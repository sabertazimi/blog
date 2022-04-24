import MockData from '@mocks/data';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import ArticleComments from './ArticleComments';

describe('ArticleComments', () => {
  const mockUrl = MockData.siteConfig.disqusUrl;

  test('should render correctly (snapshot)', () => {
    const { container } = render(<ArticleComments url={mockUrl} />);

    expect(container).toMatchSnapshot();
  });

  test('Should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<ArticleComments url={mockUrl} />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });
});
