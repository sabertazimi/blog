import React from 'react';

import { Segment, Container, Divider, Card } from 'semantic-ui-react';

import BookCard from './BookCard';

const BookGrid = ({ booklist }) => (
  <Segment style={{ padding: '3em 0em' }} vertical>
    <Container text>
      <Divider
        as="h4"
        className="header"
        horizontal
        style={{ margin: '3em 0em' }}
      >
        Book List
      </Divider>
      <Card.Group centered>
        {booklist.map((book, index) => {
          return <BookCard key={index} {...book} />;
        })}
      </Card.Group>
    </Container>
  </Segment>
);

export default BookGrid;
