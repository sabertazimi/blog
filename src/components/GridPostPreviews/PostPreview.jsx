import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Spring } from 'react-spring/renderprops';
import { Container, Label } from 'semantic-ui-react';
import PreviewMarkdown from './PreviewMarkdown';
import './PostPreview.css';

const PostPreview = ({ post }) => {
  const [dimmerActive, setActive] = useState(false);
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
    'grey',
  ];

  const handleShow = () => {
    setActive(true);
  };

  const handleHide = () => {
    setActive(false);
  };

  const getRandomColor = () => {
    const colorIdx = Math.floor(Math.random() * 11);
    return colors[colorIdx];
  };

  const tagName = post.tags ? post.tags[0] : 'Computer Science';

  return (
    <Spring
      from={{ opacity: 0, transform: 'translateX(-200px)' }}
      to={{ opacity: 1, transform: 'translateX(0)' }}
    >
      {props => (
        <Container
          text
          style={{
            ...props,
            width: '100%',
            marginBottom: '2em',
            padding: '1em 1.2em',
          }}
          className="cell"
        >
          <Label
            as={Link}
            color={getRandomColor()}
            to={`/tags/${tagName}`}
            ribbon
          >
            {tagName}
          </Label>
          <h2 style={{ paddingTop: '1rem' }}>{post.title || 'Article'}</h2>
          <Label color="black" style={{ marginBottom: '3rem' }}>
            Posted on {new Date(post.date).toDateString() || 'Nowadays'}{' '}
          </Label>
          <PreviewMarkdown
            post={post}
            dimmerActive={dimmerActive}
            onMouseEnter={handleShow}
            onMouseLeave={handleHide}
          />
        </Container>
      )}
    </Spring>
  );
};

export default PostPreview;
