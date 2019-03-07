import React from 'react';
import { Icon, Card } from 'semantic-ui-react';

const BookCard = ({ title, url, author, description }) => (
  <Card fluid raised>
    <Card.Content textAlign="center">
      <Card.Header>
        <a href={url}>
          <h3>{title}</h3>
        </a>
      </Card.Header>
      <Card.Meta>
        <span className="date">
          <Icon name="write" />
          {author}
        </span>
      </Card.Meta>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
  </Card>
);

export default BookCard;
