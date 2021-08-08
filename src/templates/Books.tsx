import { BooksGrid, MetaHeader } from '@components';
import { useSiteMetadata } from '@hooks';
import { Layout } from '@layouts';
import React from 'react';

const Books = (): JSX.Element => {
  const { siteUrl, title, bookList } = useSiteMetadata();

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <Layout banner="Books">
        <BooksGrid bookList={bookList} />
      </Layout>
    </div>
  );
};

export default Books;
