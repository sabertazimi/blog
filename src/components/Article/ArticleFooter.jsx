import React from 'react';
import { Link } from 'gatsby';
import { Button, Icon } from 'antd';
import { useResponsive } from 'hooks';
import { BreakPoints, Colors } from 'config';
import * as styles from './ArticleFooter.module.css';

const ArticleFooter = ({ post }) => {
  const isMobile = useResponsive({ maxWidth: BreakPoints.mobile });

  return (
    <div className={styles.clearfix}>
      <Button
        type="primary"
        size="large"
        style={{
          float: 'left',
          width: isMobile ? '100%' : '47%',
          height: '4em',
          marginBottom: isMobile ? '1em' : 0,
          padding: '0.3em 1em',
          borderRadius: 0,
          fontSize: '1.5em',
          color: Colors.light,
        }}
      >
        <Icon
          type={post.prevPost ? 'arrow-left' : 'home'}
          style={{ marginRight: '10px' }}
        />
        <Link
          to={post.prevPost ? `${post.prevPost.slug}` : '/posts'}
          style={{ fontWeight: 800, color: Colors.light }}
        >
          {post.prevPost ? `${post.prevPost.title}` : 'Back to Home'}
        </Link>
      </Button>
      <Button
        size="large"
        type="primary"
        style={{
          float: 'right',
          width: isMobile ? '100%' : '47%',
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
        <Icon
          type={post.nextPost ? 'arrow-right' : 'home'}
          style={{ marginLeft: '10px' }}
        />
      </Button>
    </div>
  );
};

export default ArticleFooter;
