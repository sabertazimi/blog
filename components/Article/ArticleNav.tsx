import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { FlexContainer } from '@components';
import type { PostMetaType } from '@types';
import { Button } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

interface Props {
  post: PostMetaType;
}

const ArticleNav = ({ post: { prevPost, nextPost } }: Props): JSX.Element => (
  <FlexContainer
    className="justify-between"
    role="navigation"
    aria-label="footer-nagivation"
  >
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
      <Link href={prevPost ? `/post/${prevPost.slug}` : '/posts'}>
        <a className="m-auto font-extrabold text-light">
          {prevPost ? prevPost.title : 'Back to Home'}
        </a>
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
      <Link href={nextPost ? `/post${nextPost.slug}` : '/posts'}>
        <a className="m-auto font-extrabold text-light">
          {nextPost ? nextPost.title : 'Back to Home'}
        </a>
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
