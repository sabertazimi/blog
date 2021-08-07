import { PostMetaType } from '@types';
import React from 'react';
import DesktopPostsGrid from './DesktopPostsGrid';
import MobilePostsGrid from './MobilePostsGrid';

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
