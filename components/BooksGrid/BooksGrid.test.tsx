import mockData from '@mocks/data';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import BooksGrid from './BooksGrid';

describe('BooksGrid', () => {
  const mockBooks = mockData.siteConfig.books;

  test('should render correctly (snapshot)', () => {
    const { container } = render(<BooksGrid books={mockBooks} />);

    expect(container).toMatchSnapshot();
  });

  test('Should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<BooksGrid books={mockBooks} />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });
});
