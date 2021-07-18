import React from 'react';
import { usePostsMetadata } from '@hooks';
import PostCard from './PostCard';

const flexStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  flex: 1,
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
};

const columnStyle = {
  ...flexStyle,
  flexDirection: 'column',
};

const rowFlexStyle = {
  ...flexStyle,
};

const leftFlexStyle = {
  ...flexStyle,
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '60%',
};

const rightFlexStyle = {
  ...leftFlexStyle,
  maxWidth: '35%',
};

const FlexContainer = ({ style, className, children, ...props }) => (
  <div
    style={{ ...style }}
    className={`flex container h-full mx-auto my-0 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const PostsGrid = () => {
  const { posts } = usePostsMetadata();
  const leftPosts = posts.slice(0, Math.ceil(posts.length / 2));
  const rightPosts = posts.slice(Math.ceil(posts.length / 2));

  return (
    <>
      <FlexContainer className="xl:hidden" style={columnStyle}>
        {posts.map((post, index) => {
          return <PostCard key={post.title || index} post={post} />;
        })}
      </FlexContainer>
      <FlexContainer className="hidden xl:visible xl:flex" style={rowFlexStyle}>
        <div style={{ ...leftFlexStyle, marginRight: '2em' }}>
          {leftPosts.map((post, index) => {
            return <PostCard key={post.title || index} post={post} />;
          })}
        </div>
        <div style={rightFlexStyle}>
          {rightPosts.map((post, index) => {
            return <PostCard key={post.title || index} post={post} />;
          })}
        </div>
      </FlexContainer>
    </>
  );
};

export default PostsGrid;
