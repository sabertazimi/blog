import Link from '@components/Link';
import { List } from '@components/Lists';
import type { PostMeta } from '@types';

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
            <Link
              href={`/post/${slug}`}
              className="text-blue-400 transition text-span-lg transform-gpu hover:translate-x-4"
            >
              {title}
            </Link>
          }
        />
      </List.Item>
    )}
  />
);

export default PostsList;
