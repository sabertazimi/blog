import React from 'react';
import { useSiteMetadata } from '@hooks';
import { Layout } from '@layouts';
import { BooksGrid } from '@components';

const Books = (): JSX.Element => {
  const { bookList } = useSiteMetadata();

  return (
    <Layout banner="Books">
      <BooksGrid bookList={bookList} />
    </Layout>
  );
};

export default Books;
