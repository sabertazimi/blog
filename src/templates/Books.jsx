import React from 'react';
import { Layout } from '@/layouts';
import { BookGrid } from '@/components';
import { useSiteMetadata } from '@/hooks';

const Books = () => {
  const { booklist } = useSiteMetadata();

  return (
    <Layout banner="Books">
      <BookGrid booklist={booklist} />
    </Layout>
  );
};

export default Books;
