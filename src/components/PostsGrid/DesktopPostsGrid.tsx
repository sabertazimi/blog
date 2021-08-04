import React from 'react';
import FlexContainer from '@components/FlexContainer';
import PostCard from './PostCard';
import { PostType } from '@types';

interface Props {
  posts: PostType[];
}

const DesktopPostsGrid = ({ posts }: Props): JSX.Element => {
  const leftPosts = posts.slice(0, Math.ceil(posts.length / 2));
  const rightPosts = posts.slice(Math.ceil(posts.length / 2));

  return (
    <FlexContainer className="items-start hidden xl:visible xl:flex">
      <FlexContainer className="flex-col max-w-7/12">
        {leftPosts.map((post, index) => {
          return <PostCard key={post.title || index} post={post} />;
        })}
      </FlexContainer>
      <FlexContainer className="flex-col max-w-4/12">
        {rightPosts.map((post, index) => {
          return <PostCard key={post.title || index} post={post} />;
        })}
      </FlexContainer>
    </FlexContainer>
  );
};

export default DesktopPostsGrid;
