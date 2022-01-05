import { FlexContainer } from '@components';
import type { PostMetaType } from '@types';
import React from 'react';
import PostCard from './PostCard';

interface Props {
  posts: PostMetaType[];
}

const MobilePostsGrid = ({ posts }: Props): JSX.Element => (
  <FlexContainer className="flex-col items-start xl:hidden">
    {posts.map((post, index) => {
      return <PostCard key={index} post={post} />;
    })}
  </FlexContainer>
);

export default MobilePostsGrid;
