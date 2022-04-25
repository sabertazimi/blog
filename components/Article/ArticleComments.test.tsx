import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import ArticleComments from './ArticleComments';

describe('ArticleComments', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<ArticleComments />);

    expect(container).toMatchSnapshot();
  });

  test('Should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<ArticleComments />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });
});
