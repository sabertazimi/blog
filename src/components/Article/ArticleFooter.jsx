import React from 'react';
import { Link } from 'gatsby';
import { Button, Icon } from 'antd';
import { Colors } from 'config';
import styles from './ArticleFooter.module.css';

const ArticleFooter = ({ post }) => (
  <div className={styles.clearfix}>
    <Button
      size="large"
      style={{
        float: 'left',
        height: '100%',
        padding: '0.3em 1em',
        fontSize: '1.5em',
        color: Colors.primary,
      }}
    >
      <Icon
        type={post.prevPost ? 'arrow-left' : 'home'}
        style={{ marginRight: '10px' }}
      />
      <Link
        to={post.prevPost ? `${post.prevPost.slug}` : '/posts'}
        style={{ fontWeight: 800 }}
      >
        {post.prevPost ? `${post.prevPost.title}` : 'Back to Home'}
      </Link>
    </Button>
    <Button
      size="large"
      style={{
        float: 'right',
        height: '100%',
        padding: '0.3em 1em',
        fontSize: '1.5em',
        color: Colors.primary,
      }}
    >
      <Link
        to={post.nextPost ? `${post.nextPost.slug}` : '/posts'}
        style={{ fontWeight: 800 }}
      >
        {post.nextPost ? `${post.nextPost.title}` : 'Back to Home'}
      </Link>
      <Icon
        type={post.nextPost ? 'arrow-right' : 'home'}
        style={{ marginLeft: '10px' }}
      />
    </Button>
  </div>
);

export default ArticleFooter;
