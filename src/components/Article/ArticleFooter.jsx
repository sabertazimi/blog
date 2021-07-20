import React from 'react';
import { Link } from 'gatsby';
import { Button } from 'antd';
import FlexContainer from '@components/FlexContainer';

const ArticleFooter = ({ post }) => (
  <FlexContainer className="justify-between ">
    <Button
      size="large"
      className="w-full h-24 mb-6 text-2xl align-bottom rounded-none md:mb-0 md:w-5/12 button-primary"
    >
      <Link
        className="font-extrabold text-light"
        to={post.prevPost ? `${post.prevPost.slug}` : '/posts'}
      >
        {post.prevPost ? `${post.prevPost.title}` : 'Back to Home'}
      </Link>
    </Button>
    <Button
      size="large"
      className="w-full h-24 mb-6 text-2xl align-bottom rounded-none md:mb-0 md:w-5/12 button-primary"
    >
      <Link
        className="font-extrabold text-light"
        to={post.nextPost ? `${post.nextPost.slug}` : '/posts'}
      >
        {post.nextPost ? `${post.nextPost.title}` : 'Back to HomePage'}
      </Link>
    </Button>
  </FlexContainer>
);

export default ArticleFooter;
