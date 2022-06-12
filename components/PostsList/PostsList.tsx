import Link from '@components/Link';
import { List } from '@components/Lists';
import type { PostMeta } from '@types';
import styles from './PostsList.module.css';

interface Props {
  posts: PostMeta[];
}

const PostsList = ({ posts }: Props): JSX.Element => (
  <List
    className="mt-6"
    dataSource={posts}
    renderItem={({ slug, title }) => (
      <List.Item>
        <List.Item.Meta
          title={
            <Link href={`/post/${slug}`} className={styles.link}>
              {title}
            </Link>
          }
        />
      </List.Item>
    )}
  />
);

export default PostsList;
