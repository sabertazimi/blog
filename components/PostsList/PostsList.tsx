import styles from './PostsList.module.css'
import Link from '@/components/Link'
import { List } from '@/components/Lists'
import type { PostMeta } from '@/types'

interface Props {
  posts: PostMeta[]
}

function PostsList({ posts }: Props): JSX.Element {
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
