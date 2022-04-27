import { CalendarOutlined, ReadOutlined } from '@ant-design/icons';
import Container from '@components/Container';
import Link from '@components/Link';
import { Slide } from '@components/Motion';
import { IconTag, LinkTag } from '@components/Tags';
import type { PostMeta } from '@types';
import { Button, Skeleton, Typography } from 'antd';
import classNames from 'classnames';

interface Props {
  post: PostMeta;
}

const PostCard = ({ post }: Props): JSX.Element => {
  const { tags, slug, title, createTime, timeToRead } = post;
  const tag = tags ? tags[0] : 'Computer Science';

  return (
    <Container
      className={classNames(
        'px-5 py-4 mt-0 mb-16',
        'transition duration-300 shadow-xl transform-gpu',
        'hover:shadow-2xl hover:-translate-y-2'
      )}
    >
      <Slide delay={0.2}>
        <LinkTag tag={tag} />
        <Typography.Title className="my-3" level={2}>
          {title}
        </Typography.Title>
        <IconTag
          tag={createTime ? new Date(createTime).toDateString() : 'Nowadays'}
          icon={<CalendarOutlined />}
        />
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
              <ReadOutlined />
            </Link>
          </Button>
        </Container>
      </Slide>
    </Container>
  );
};

export default PostCard;
