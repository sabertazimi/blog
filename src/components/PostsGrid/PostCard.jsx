import React from 'react';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import { Button, Skeleton, Tag, Typography } from 'antd';
import { ReadOutlined } from '@ant-design/icons';
import { Colors, getRandomColor } from '@config';
import Container from '@components/Container';

const PostCard = ({ post }) => {
  const tagName = post.tags ? post.tags[0] : 'Computer Science';
  const props = useSpring({
    from: { opacity: 0, transform: 'translateX(-200px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    delay: 200,
  });

  return (
    <Container className="px-5 py-4 mt-0 mb-16 transition duration-300 shadow-xl transform-gpu hover:shadow-2xl hover:-translate-y-2">
      <animated.div style={props}>
        <Tag className="mb-3" color={getRandomColor()}>
          <Link className="text-base font-extrabold" to={`/tags/${tagName}`}>
            {tagName}
          </Link>
        </Tag>
        <Typography.Title
          level={2}
          style={{ marginTop: 0, marginBottom: '1rem' }}
        >
          {post.title || 'Article'}
        </Typography.Title>
        <Tag className="mb-3" color={Colors.black}>
          <div className="text-base font-extrabold">
            Posted on {new Date(post.date).toDateString() || 'Nowadays'}{' '}
          </div>
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
            <Link style={{ color: Colors.light }} to={`${post.slug}`}>
              <ReadOutlined />
            </Link>
          </Button>
        </Container>
      </animated.div>
    </Container>
  );
};

export default PostCard;
