import React from 'react';
import { Layout } from 'layouts';
import { BookGrid } from 'components';

const Books = () => {
  const booklist = [
    {
      title: 'awesome-notes',
      author: 'sabertazimi',
      url: 'https://notes.tazimi.dev',
      description: 'Daily I Learned Notes',
    },
  ];

  return (
    <Layout banner="Books">
      <BookGrid booklist={booklist} />
    </Layout>
  );
};

export default Books;
