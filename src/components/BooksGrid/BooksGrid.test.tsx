import MockData from '@MockData';
import React from 'react';
import { create } from 'react-test-renderer';
import BooksGrid from './BooksGrid';

describe('BooksGrid', () => {
  const mockBooks = MockData.siteMetadata.bookList;

  test('should render correctly (snapshot)', () => {
    const tree = create(<BooksGrid bookList={mockBooks} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
