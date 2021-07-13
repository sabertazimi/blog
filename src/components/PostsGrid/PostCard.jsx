import React from 'react';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import { Button, Skeleton, Tag } from 'antd';
import { ReadOutlined } from '@ant-design/icons';
import { Colors, getRandomColor } from '@/config';
import { Container } from '@/components';
import * as styles from './PostCard.module.css';

const PostCard = ({ post }) => {
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
          className="mb-3"
          color={getRandomColor()}
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
          className="mb-3 font-extrabold"
          style={{ color: Colors.light }}
        >
          Posted on {new Date(post.date).toDateString() || 'Nowadays'}{' '}
        </Tag>
        <Container>
          <Skeleton
            paragraph={{ rows: Math.min(Math.floor(post.timeToRead / 2), 10) }}
          />
          <Button
            type="primary"
            shape="circle"
            size="large"
            style={{
              float: 'right',
              width: '2.5em',
              height: '2.5em',
              margin: 0,
              fontSize: '1.5em',
            }}
          >
            <Link to={`${post.slug}`} style={{ color: Colors.light }}>
              <ReadOutlined />
            </Link>
          </Button>
        </Container>
      </Container>
    </animated.div>
  );
};

export default PostCard;
