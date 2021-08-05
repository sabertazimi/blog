import React from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';
import { Button } from 'antd';
import { PostMetaType } from '@types';
import FlexContainer from '@components/FlexContainer';

interface Props {
  post: PostMetaType;
}

const ArticleNav = ({ post }: Props): JSX.Element => (
  <FlexContainer className="justify-between" role="navigation">
    <Button
      className={classNames(
        'w-full h-24 mb-6',
        'text-2xl align-bottom rounded-none',
        'md:mb-0 md:w-5/12',
        'button-primary'
      )}
      size="large"
    >
      <Link
        className="font-extrabold text-light"
        to={post.prevPost ? `${post.prevPost.slug}` : '/posts'}
      >
        {post.prevPost ? `${post.prevPost.title}` : 'Back to Home'}
      </Link>
    </Button>
    <Button
      className={classNames(
        'w-full h-24 mb-6',
        'text-2xl align-bottom rounded-none',
        'md:mb-0 md:w-5/12',
        'button-primary'
      )}
      size="large"
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

export default ArticleNav;
