import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import BooksGrid from './BooksGrid';

describe('BooksGrid', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<BooksGrid />);

    expect(container).toMatchSnapshot();
  });

  test('Should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<BooksGrid />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });
});
