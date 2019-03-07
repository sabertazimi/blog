import React, { useState } from 'react';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import { Container, Label } from 'semantic-ui-react';
import PreviewMarkdown from './PreviewMarkdown';
import { randomColor } from '../../utils';
import './PostPreview.css';

const PostPreview = ({ post }) => {
  const [dimmerActive, setActive] = useState(false);
  const handleShow = () => setActive(true);
  const handleHide = () => setActive(false);
  const tagName = post.tags ? post.tags[0] : 'Computer Science';
  const props = useSpring({
    from: { opacity: 0, transform: 'translateX(-200px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  return (
    <animated.div style={props}>
      <Container
        text
        style={{
          width: '100%',
          marginBottom: '2em',
          padding: '1em 1.2em',
        }}
        className="cell"
      >
        <Label as={Link} color={randomColor()} to={`/tags/${tagName}`} ribbon>
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
    </animated.div>
  );
};

export default PostPreview;
