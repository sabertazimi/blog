import React from 'react';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import { Button, Skeleton, Tag, Typography } from 'antd';
import { ReadOutlined } from '@ant-design/icons';
import { getColorByName } from '@config';
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
        <Tag color={getColorByName(tagName)}>
          <Link className="text-base font-extrabold" to={`/tags/${tagName}`}>
            {tagName}
          </Link>
        </Tag>
        <Typography.Title level={2} className="my-3">
          {post.title || 'Article'}
        </Typography.Title>
        <Tag className="tag-black">
          <div className="text-base font-extrabold">
            Posted on {new Date(post.date).toDateString() || 'Nowadays'}{' '}
          </div>
        </Tag>
        <Container className="mt-3">
          <Skeleton
            paragraph={{ rows: Math.min(Math.floor(post.timeToRead / 2), 10) }}
          />
          <Button className="float-right m-0 text-2xl rounded-full w-14 h-14 button-primary">
            <Link to={`${post.slug}`}>
              <ReadOutlined />
            </Link>
          </Button>
        </Container>
      </animated.div>
    </Container>
  );
};

export default PostCard;
