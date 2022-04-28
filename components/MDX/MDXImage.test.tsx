import { render } from '@testing-library/react';
import MDXImage from './MDXImage';

describe('MDXImage', () => {
  test('should render placeholder image correctly (snapshot)', () => {
    const { container } = render(<MDXImage />);

    expect(container).toMatchSnapshot();
  });

  test('should render local image correctly (snapshot)', () => {
    const { container } = render(<MDXImage src="/public/images/landing.jpg" />);

    expect(container).toMatchSnapshot();
  });
});
