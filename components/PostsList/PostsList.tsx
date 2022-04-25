import type { PostMeta } from '@types';
import { List } from 'antd';
import Link from 'next/link';

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
            <Link href={`/post/${slug}`}>
              <a className="text-blue-400 transition text-span-lg transform-gpu hover:translate-x-4">
                {title}
              </a>
            </Link>
          }
        />
      </List.Item>
    )}
  />
);

export default PostsList;
