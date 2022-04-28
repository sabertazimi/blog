import Container from '@components/Container';
import { Calendar, Read } from '@components/Icons';
import Link from '@components/Link';
import { Slide } from '@components/Motion';
import { IconTag, LinkTag } from '@components/Tags';
import { classNames } from '@components/utils';
import type { PostMeta } from '@types';
import { Button, Skeleton, Typography } from 'antd';

interface Props {
  post: PostMeta;
}

const PostCard = ({
  post: { slug, title, createTime, readingTime, tags },
}: Props): JSX.Element => (
  <Container
    className={classNames(
      'px-5 py-4 mt-0 mb-16',
      'transition duration-300 shadow-xl transform-gpu',
      'hover:shadow-2xl hover:-translate-y-2'
    )}
  >
    <Slide delay={0.2}>
      <LinkTag tag={tags ? tags[0] : 'Computer Science'} />
      <Typography.Title className="my-3" level={2}>
        {title}
      </Typography.Title>
      <IconTag
        tag={createTime ? new Date(createTime).toDateString() : 'Nowadays'}
        icon={<Calendar />}
      />
      <Container className="mt-3">
        <Skeleton
          paragraph={{ rows: Math.min(Math.floor(readingTime / 2), 10) }}
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
            <Read />
          </Link>
        </Button>
      </Container>
    </Slide>
  </Container>
);

export default PostCard;
