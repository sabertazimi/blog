import React from 'react';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import { Container, Label } from 'semantic-ui-react';
import PreviewMarkdown from './PreviewMarkdown';
import { randomColor } from 'utils';
import styles from './PostPreview.module.css';

const PostPreview = ({ post }) => {
  const tagName = post.tags ? post.tags[0] : 'Computer Science';
  const props = useSpring({
    from: { opacity: 0, transform: 'translateX(-200px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  return (
    <animated.div style={{ ...props, width: '100%' }}>
      <Container
        style={{
          maxWidth: 960,
          marginTop: 0,
          marginBottom: '2em',
          padding: '1em 1.2em',
        }}
        className={styles.cell}
      >
        <Label as={Link} color={randomColor()} to={`/tags/${tagName}`} ribbon>
          {tagName}
        </Label>
        <h2 style={{ paddingTop: '1rem' }}>{post.title || 'Article'}</h2>
        <Label color="black" style={{ marginBottom: '3rem' }}>
          Posted on {new Date(post.date).toDateString() || 'Nowadays'}{' '}
        </Label>
        <PreviewMarkdown post={post} />
      </Container>
    </animated.div>
  );
};

export default PostPreview;
