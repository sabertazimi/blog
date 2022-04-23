import { ReadOutlined } from '@ant-design/icons';
import { Container } from '@components';
import { getColorByName } from '@config';
import type { PostMetaType } from '@types';
import { Button, Skeleton, Tag, Typography } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { animated, useSpring } from 'react-spring';

interface Props {
  post: PostMetaType;
}

const PostCard = ({ post }: Props): JSX.Element => {
  const { tags, slug, title, date, timeToRead } = post;
  const tagName = tags ? tags[0] : 'Computer Science';
  const props = useSpring({
    from: { opacity: 0, transform: 'translateX(-200px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    delay: 200,
  });

  return (
    <Container
      className={classNames(
        'px-5 py-4 mt-0 mb-16',
        'transition duration-300 shadow-xl transform-gpu',
        'hover:shadow-2xl hover:-translate-y-2'
      )}
    >
      <animated.div style={props}>
        <Tag color={getColorByName(tagName)}>
          <Link href={`/tag/${tagName}`}>
            <a className="text-base font-extrabold">{tagName}</a>
          </Link>
        </Tag>
        <Typography.Title className="my-3" level={2}>
          {title}
        </Typography.Title>
        <Tag className="tag-black">
          <div className="text-base font-extrabold">
            Posted on {date ? new Date(date).toDateString() : 'Nowadays'}{' '}
          </div>
        </Tag>
        <Container className="mt-3">
          <Skeleton
            paragraph={{ rows: Math.min(Math.floor(timeToRead / 2), 10) }}
          />
          <Button
            className={classNames(
              'float-right m-0',
              'text-2xl rounded-full',
              'w-14 h-14',
              'button-primary'
            )}
          >
            <Link href={`/post/${slug}`} passHref>
              <ReadOutlined />
            </Link>
          </Button>
        </Container>
      </animated.div>
    </Container>
  );
};

export default PostCard;
