import React from 'react';
import { Divider, Segment } from 'semantic-ui-react';

import Responsive from './Responsive';
import PostPreview from './PostPreview';

const flexStyle = {
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  flex: 1,
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
  maxWidth: '55%',
};

const rightFlexStyle = {
  ...leftFlexStyle,
  maxWidth: '35%',
};

const GridPostPreviews = ({ posts }) => {
  const leftPosts = posts.slice(0, Math.ceil(posts.length / 2));
  const rightPosts = posts.slice(Math.ceil(posts.length / 2));

  return (
    <Segment
      style={{ width: '100%', padding: '8em 0em', overflow: 'hidden' }}
      vertical
    >
      <Responsive minWidth={1280}>
        <div style={rowFlexStyle}>
          <div style={leftFlexStyle}>
            {leftPosts.map((post, index) => {
              return (
                <PostPreview key={post.title || index} post={post} />
              );
            })}
          </div>
          <div style={rightFlexStyle}>
            {rightPosts.map((post, index) => {
              return (
                <PostPreview key={post.title || index} post={post} />
              );
            })}
          </div>
        </div>
      </Responsive>
      <Responsive maxWidth={1279}>
        <div style={columnStyle}>
          {posts.map((post, index) => {
            return (
              <PostPreview key={post.title || index} post={post} />
            );
          })}
        </div>
      </Responsive>
      <Divider as="h4" className="header" style={{ margin: '3em 0em' }} />
    </Segment>
  );
};

export default GridPostPreviews;
