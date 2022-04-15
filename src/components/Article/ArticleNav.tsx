import { FlexContainer } from '@components';
import type { PostMetaType } from '@types';
import { Button } from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { Link } from 'gatsby';
import React from 'react';

interface Props {
  post: PostMetaType;
}

const ArticleNav = ({ post: { prevPost, nextPost } }: Props): JSX.Element => (
  <FlexContainer className="justify-between" role="navigation">
    <Button
      className={classNames(
        'flex-container',
        'w-full h-24 mb-6',
        'text-2xl align-bottom rounded-none',
        'md:mb-0 md:w-5/12',
        'button-primary'
      )}
      size="large"
    >
      {prevPost ? (
        <ArrowLeftOutlined aria-label="Prev" />
      ) : (
        <HomeOutlined aria-label="Home" />
      )}
      <Link
        className="m-auto font-extrabold text-light"
        to={prevPost ? prevPost.slug : '/posts'}
      >
        {prevPost ? prevPost.title : 'Back to Home'}
      </Link>
    </Button>
    <Button
      className={classNames(
        'flex-container',
        'w-full h-24 mb-6',
        'text-2xl align-bottom rounded-none',
        'md:mb-0 md:w-5/12',
        'button-primary'
      )}
      size="large"
    >
      <Link
        className="m-auto font-extrabold text-light"
        to={nextPost ? nextPost.slug : '/posts'}
      >
        {nextPost ? nextPost.title : 'Back to Home'}
      </Link>
      {nextPost ? (
        <ArrowRightOutlined aria-label="Next" />
      ) : (
        <HomeOutlined aria-label="Home" />
      )}
    </Button>
  </FlexContainer>
);

export default ArticleNav;
