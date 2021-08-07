import { BooksGrid } from '@components';
import { useSiteMetadata } from '@hooks';
import { Layout } from '@layouts';
import React from 'react';

const Books = (): JSX.Element => {
  const { bookList } = useSiteMetadata();

  return (
    <Layout banner="Books">
      <BooksGrid bookList={bookList} />
    </Layout>
  );
};

export default Books;
