import React from 'react';
import { Link } from 'gatsby';
import { List } from 'antd';
import { PostMetaType } from '@types';

interface Props {
  posts: PostMetaType[];
}

const PostsList = ({ posts }: Props): JSX.Element => (
  <List
    className="mt-6"
    dataSource={posts}
    renderItem={(post) => (
      <List.Item>
        <List.Item.Meta
          title={
            <Link
              className="text-blue-400 transition text-span-lg transform-gpu hover:translate-x-4"
              to={`${post.slug}`}
            >
              {post.title}
            </Link>
          }
        />
      </List.Item>
    )}
  />
);

export default PostsList;
