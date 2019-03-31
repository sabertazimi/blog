import React from 'react';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import { Tag } from 'antd';
import { Container } from 'components';
import PreviewMarkdown from './PreviewMarkdown';
import { Colors } from 'config';
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
          marginTop: 0,
          marginBottom: '3em',
          padding: '1em 1.2em',
        }}
        className={styles.cell}
      >
        <Tag
          key={tagName}
          color={randomColor()}
          style={{ marginBottom: '1rem' }}
        >
          <Link to={`/tags/${tagName}`} style={{ fontWeight: 800 }}>
            {tagName}
          </Link>
        </Tag>
        <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>
          {post.title || 'Article'}
        </h2>
        <Tag
          color={Colors.black}
          style={{ marginBottom: '1rem', color: Colors.light, fontWeight: 800 }}
        >
          Posted on {new Date(post.date).toDateString() || 'Nowadays'}{' '}
        </Tag>
        <PreviewMarkdown post={post} />
      </Container>
    </animated.div>
  );
};

export default PostPreview;
