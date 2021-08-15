import React from 'react';
import { create } from 'react-test-renderer';
import BooksGrid from './BooksGrid';

const bookList = Array.from(Array(3).keys()).map(index => ({
  title: `Book ${index}`,
  author: 'Sabertaz',
  url: `https://example.com/${index}`,
  description: `Book ${index} description`,
}));

describe('BooksGrid', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(<BooksGrid bookList={bookList} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
