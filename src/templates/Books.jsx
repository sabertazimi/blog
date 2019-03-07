import React from 'react';
import { SimpleLayout } from '../layouts';
import { BookGrid } from '../components';

const Books = () => {
  const booklist = [
    {
      title: 'awesome-notes',
      author: 'sabertazimi',
      url: 'https://sabertazimi.github.io/awesome-notes',
      description: 'Daily I Learned Notes',
    },
  ];

  return (
    <SimpleLayout>
      <BookGrid booklist={booklist} />
    </SimpleLayout>
  );
};

export default Books;
