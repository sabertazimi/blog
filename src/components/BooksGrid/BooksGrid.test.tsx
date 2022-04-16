import MockData from '@MockData';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { create } from 'react-test-renderer';
import BooksGrid from './BooksGrid';

describe('BooksGrid', () => {
  const mockBooks = MockData.siteMetadata.bookList;

  test('should render correctly (snapshot)', () => {
    const tree = create(<BooksGrid bookList={mockBooks} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<BooksGrid bookList={mockBooks} />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });
});
