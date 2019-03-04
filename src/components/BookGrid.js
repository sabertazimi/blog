import React, { Component } from 'react';

import {
    Segment,
    Container,
    Divider,
    Card
} from 'semantic-ui-react';

import BookCard from './BookCard.js';

class BookGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'booklist': [
        {
          'title': 'awesome-notes',
          'author': 'sabertazimi',
          'url': 'https://sabertazimi.github.io/awesome-notes',
          'description': 'Daily I Learned Notes'
        },
      ]
    }
  }

  render() {
    const { booklist } = this.state;

    return (
      <Segment style={{ padding: '3em 0em' }} vertical>
        <Container text>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em' }}
            >
            Book List
          </Divider>
          <Card.Group centered>
            {
              booklist.map((book, index) => {
                  return <BookCard key={ index } { ...book } />
              })
            } 
          </Card.Group>
        </Container>
      </Segment>
    );
  }
}

export default BookGrid;
