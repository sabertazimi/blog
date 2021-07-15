import React from 'react';
import { Link } from 'gatsby';
import { Button } from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Colors } from '@config';
import * as styles from './ArticleFooter.module.css';

const ArticleFooter = ({ post }) => (
  <div className={styles.clearfix}>
    <Button
      type="primary"
      size="large"
      className="w-full mb-6 md:mb-0 md:w-5/12 "
      style={{
        float: 'left',
        height: '4em',
        padding: '0.3em 1em',
        borderRadius: 0,
        fontSize: '1.5em',
        color: Colors.light,
      }}
    >
      {post.prevPost ? (
        <ArrowLeftOutlined style={{ marginRight: '10px' }} />
      ) : (
        <HomeOutlined style={{ marginRight: '10px' }} />
      )}
      <Link
        to={post.prevPost ? `${post.prevPost.slug}` : '/posts'}
        style={{ fontWeight: 800, color: Colors.light }}
      >
        {post.prevPost ? `${post.prevPost.title}` : 'Back to Home'}
      </Link>
    </Button>
    <Button
      type="primary"
      size="large"
      className="w-full mb-6 md:mb-0 md:w-5/12 "
      style={{
        float: 'right',
        height: '4em',
        padding: '0.3em 1em',
        borderRadius: 0,
        fontSize: '1.5em',
        color: Colors.light,
      }}
    >
      <Link
        to={post.nextPost ? `${post.nextPost.slug}` : '/posts'}
        style={{ fontWeight: 800, color: Colors.light }}
      >
        {post.nextPost ? `${post.nextPost.title}` : 'Back to Home'}
      </Link>
      {post.nextPost ? (
        <ArrowRightOutlined style={{ marginRight: '10px' }} />
      ) : (
        <HomeOutlined style={{ marginLeft: '10px' }} />
      )}
    </Button>
  </div>
);

export default ArticleFooter;
