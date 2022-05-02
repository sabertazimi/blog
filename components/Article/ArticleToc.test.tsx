import { render } from '@testing-library/react';
import ArticleToc from './ArticleToc';

describe('ArticleToc', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<ArticleToc slug="slug"/>);

    expect(container).toMatchSnapshot();
  });
});
