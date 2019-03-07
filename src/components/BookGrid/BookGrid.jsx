import React from 'react';
import { Card } from 'semantic-ui-react';

import BookCard from './BookCard';

const BookGrid = ({ booklist }) => (
  <Card.Group centered>
    {booklist.map((book, index) => {
      return <BookCard key={index} {...book} />;
    })}
  </Card.Group>
);

export default BookGrid;
