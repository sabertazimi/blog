import { PostMetaType } from '@types';
import { List } from 'antd';
import { Link } from 'gatsby';
import React from 'react';

interface Props {
  posts: PostMetaType[];
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
              className="text-blue-400 transition text-span-lg transform-gpu hover:translate-x-4"
              to={`${slug}`}
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
