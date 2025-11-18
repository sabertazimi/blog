'use client'

import type { PostMeta } from '@/types'
import Link from '@/components/Link'
import { List } from '@/components/Lists'
import styles from './PostsList.module.css'

interface Props {
  posts: PostMeta[]
}

function PostsList({ posts }: Props) {
  return (
    <List
      className="mt-6"
      dataSource={posts}
      renderItem={({ slug, title }) => (
        <List.Item>
          <List.Item.Meta
            title={(
              <Link href={`/post/${slug}`} className={styles.link}>
                {title}
              </Link>
            )}
          />
        </List.Item>
      )}
    />
  )
}

export default PostsList
