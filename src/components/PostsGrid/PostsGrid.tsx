import React from 'react';
import { PostMetaType } from '@types';
import MobilePostsGrid from './MobilePostsGrid';
import DesktopPostsGrid from './DesktopPostsGrid';
interface Props {
  posts: PostMetaType[];
}

const PostsGrid = ({ posts }: Props): JSX.Element => (
  <>
    <MobilePostsGrid posts={posts} />
    <DesktopPostsGrid posts={posts} />
  </>
);

export default PostsGrid;
