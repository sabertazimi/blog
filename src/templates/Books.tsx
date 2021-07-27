import React from 'react';
import { PageProps } from 'gatsby';
import { Layout } from '@layouts';
import { BooksGrid } from '@components';

const Books: React.FC<PageProps> = () => {
  return (
    <Layout banner="Books">
      <BooksGrid />
    </Layout>
  );
};

export default Books;
