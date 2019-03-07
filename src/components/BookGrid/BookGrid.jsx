import React from 'react';
import { Spring } from 'react-spring/renderprops';

import { Segment, Container, Divider, Card } from 'semantic-ui-react';

import BookCard from './BookCard';

const BookGrid = ({ booklist }) => (
  <Segment style={{ padding: '3em 0em' }} vertical>
    <Spring
      from={{ opacity: 0, transform: 'translateX(-200px)' }}
      to={{ opacity: 1, transform: 'translateX(0)' }}
    >
      {props => (
        <Container text style={{ ...props }} className="slideIn">
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
      )}
    </Spring>
  </Segment>
);

export default BookGrid;
