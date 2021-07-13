import React from 'react';
import { Card } from 'semantic-ui-react';
import { useSiteMetadata } from '@/hooks';
import BookCard from './BookCard';

const BookGrid = () => {
  const { booklist } = useSiteMetadata();

  return (
    <Card.Group centered>
      {booklist.map((bookData, index) => {
        return <BookCard key={index} data={bookData} />;
      })}
    </Card.Group>
  );
};

export default BookGrid;
