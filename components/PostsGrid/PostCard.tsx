import { ReadOutlined } from '@ant-design/icons';
import { Container } from '@components';
import { Slide } from '@components/Motion';
import { getColorByName } from '@config';
import type { PostMeta } from '@types';
import { Button, Skeleton, Tag, Typography } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';

interface Props {
  post: PostMeta;
}

const PostCard = ({ post }: Props): JSX.Element => {
  const { tags, slug, title, createTime, timeToRead } = post;
  const tagName = tags ? tags[0] : 'Computer Science';

  return (
    <Container
      className={classNames(
        'px-5 py-4 mt-0 mb-16',
        'transition duration-300 shadow-xl transform-gpu',
        'hover:shadow-2xl hover:-translate-y-2'
      )}
    >
      <Slide delay={0.2}>
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
            Posted on{' '}
            {createTime ? new Date(createTime).toDateString() : 'Nowadays'}{' '}
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
            <Link href={`/post/${slug}`}>
              <a>
                <ReadOutlined />
              </a>
            </Link>
          </Button>
        </Container>
      </Slide>
    </Container>
  );
};

export default PostCard;
