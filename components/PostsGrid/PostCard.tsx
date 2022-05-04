import Button from '@components/Button';
import Container from '@components/Container';
import { H2 } from '@components/Headings';
import { Calendar, Read } from '@components/Icons';
import Link from '@components/Link';
import { Slide } from '@components/Motion';
import Skeleton from '@components/Skeleton';
import { IconTag, LinkTag } from '@components/Tags';
import { classNames } from '@components/utils';
import type { PostMeta } from '@types';
import styles from './PostCard.module.css';

interface Props {
  post: PostMeta;
}

const PostCard = ({
  post: { slug, title, createTime, readingTime, tags },
}: Props): JSX.Element => (
  <Container
    className={classNames(
      styles.card,
      'dark:bg-black',
      'dark:border dark:border-solid dark:border-light',
      'dark:shadow-dark dark:hover:shadow-primary'
    )}
  >
    <Slide delay={0.2}>
      <LinkTag tag={tags ? tags[0] : 'Computer Science'} />
      <H2 className={styles.title}>{title}</H2>
      <IconTag
        tag={createTime ? new Date(createTime).toDateString() : 'Nowadays'}
        icon={<Calendar />}
      />
      <Container className={styles.skeleton}>
        <Skeleton
          paragraph={{ rows: Math.min(Math.floor(readingTime / 2), 10) }}
        />
        <Button className={styles.button}>
          <Link href={`/post/${slug}`}>
            <Read />
          </Link>
        </Button>
      </Container>
    </Slide>
  </Container>
);

export default PostCard;
