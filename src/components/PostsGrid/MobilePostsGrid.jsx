import React from 'react';
import FlexContainer from '@components/FlexContainer';
import PostCard from './PostCard';

const MobilePostsGrid = ({ posts }) => (
  <FlexContainer className="flex-col items-start xl:hidden">
    {posts.map((post, index) => {
      return <PostCard key={post.title || index} post={post} />;
    })}
  </FlexContainer>
);

export default MobilePostsGrid;
