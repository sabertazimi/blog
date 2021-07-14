import React from 'react';
import { Layout } from '@/layouts';
import { BooksGrid } from '@/components';

const Books = () => {
  return (
    <Layout banner="Books">
      <BooksGrid />
    </Layout>
  );
};

export default Books;
