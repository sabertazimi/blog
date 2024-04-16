import cx from 'classnames'
import styles from './PostCard.module.css'
import Container from '@/components/Container'
import { H2 } from '@/components/Headings'
import { Calendar, Read } from '@/components/Icons'
import Link from '@/components/Link'
import { Slide } from '@/components/Motion'
import Skeleton from '@/components/Skeleton'
import { IconTag, LinkTag } from '@/components/Tags'
import type { PostMeta } from '@/types'

interface Props {
  post: PostMeta
}

function PostCard({
  post: { slug, title, createTime, readingTime, tags },
}: Props): JSX.Element {
  return (
    <Container className="card mb-16 mt-0 px-5 py-4">
      <Slide delay={0.2}>
        <LinkTag tag={tags ? tags[0] : 'Computer Science'} />
        <H2 className={styles.title}>{title}</H2>
        <IconTag
          tag={createTime ? new Date(createTime).toDateString() : 'Nowadays'}
          icon={<Calendar />}
        />
        <Container className="mt-3">
          <Skeleton
            paragraph={{ rows: Math.min(Math.floor(readingTime / 2), 10) }}
          />
          <Link
            href={`/post/${slug}`}
            className={cx(
              'flex-container float-right m-0 h-14 w-14 rounded-full border-primary',
              'bg-primary text-2xl text-light',
              'transition hover:bg-secondary hover:text-light focus:bg-secondary focus:text-light',
            )}
          >
            <Read />
          </Link>
        </Container>
      </Slide>
    </Container>
  )
}

export default PostCard
