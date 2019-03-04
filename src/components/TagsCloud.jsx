import React from 'react';
import { NavLink } from 'react-router-dom';
import { Label, Divider, Container, Segment } from 'semantic-ui-react';

import Error from './Error';
import PageLoader from './PageLoader';

const TagsCloud = ({ error, isLoading, history, data }) => {
  const colors = [
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey'
  ];

  const getRandomColor = () => {
    const colorIdx = Math.floor(Math.random() * 11);
    return colors[colorIdx];
  };

  if (error) {
    return <Error message={{ header: 'Bad Request' }} history={history} />;
  }

  if (isLoading || !data) {
    return <PageLoader message="Loading" />;
  }

  const tags = Object.keys(data).sort((a, b) => {
    return data[b] - data[a];
  });

  return (
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: '3em 0em' }}
        >
          Tags
        </Divider>
        <Label.Group tag>
          {tags.map(tag => {
            return (
              <Label
                key={tag}
                color={getRandomColor()}
                as={NavLink}
                to={`/tags/${tag}`}
              >
                {tag} &nbsp;&nbsp; {data[tag]}
              </Label>
            );
          })}
        </Label.Group>
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: '3em 0em' }}
        >
          Tags
        </Divider>
      </Container>
    </Segment>
  );
};

export default TagsCloud;
