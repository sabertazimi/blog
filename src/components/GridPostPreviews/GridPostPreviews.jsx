import React from 'react';
import PostPreview from './PostPreview';
import { useResponsive } from 'hooks';
import { BreakPoints } from 'config';

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

const GridPostPreviews = ({ posts }) => {
  const leftPosts = posts.slice(0, Math.ceil(posts.length / 2));
  const rightPosts = posts.slice(Math.ceil(posts.length / 2));
  const isMobile = useResponsive({ maxWidth: BreakPoints.mobile });
  const isnotMobile = useResponsive({ minWidth: BreakPoints.desktop });

  return (
    <div style={{ paddingTop: isMobile ? 0 : '11em' }}>
      {isnotMobile ? (
        <div style={rowFlexStyle}>
          <div style={{ ...leftFlexStyle, marginRight: '2em' }}>
            {leftPosts.map((post, index) => {
              return <PostPreview key={post.title || index} post={post} />;
            })}
          </div>
          <div style={rightFlexStyle}>
            {rightPosts.map((post, index) => {
              return <PostPreview key={post.title || index} post={post} />;
            })}
          </div>
        </div>
      ) : (
        <div style={columnStyle}>
          {posts.map((post, index) => {
            return <PostPreview key={post.title || index} post={post} />;
          })}
        </div>
      )}
    </div>
  );
};

export default GridPostPreviews;
