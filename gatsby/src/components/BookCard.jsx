import React from 'react';

import {
  Icon,
  Card
} from 'semantic-ui-react';

const BookCard = ({
  title,
  url,
  author,
  description,
}) => (
  <Card>
    <Card.Content>
      <Card.Header>
        <a href={url}>
          <Icon name='book' />
          { title }
        </a>
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          <Icon name='write' />
          { author }
        </span>
      </Card.Meta>
      <Card.Description>
        { description }
      </Card.Description>
    </Card.Content>
  </Card>
);

export default BookCard;
