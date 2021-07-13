import React from 'react';
import { Layout } from '@/layouts';
import { BookGrid } from '@/components';

const Books = () => {
  return (
    <Layout banner="Books">
      <BookGrid />
    </Layout>
  );
};

export default Books;
