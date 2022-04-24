import MockData from '@mocks/data';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import BooksGrid from './BooksGrid';

describe('BooksGrid', () => {
  const mockBooks = MockData.siteMetadata.bookList;

  test('should render correctly (snapshot)', () => {
    const { container } = render(<BooksGrid bookList={mockBooks} />);

    expect(container).toMatchSnapshot();
  });

  test('Should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<BooksGrid bookList={mockBooks} />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });
});
