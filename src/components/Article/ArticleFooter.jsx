import React from 'react';
import { Link } from 'gatsby';
import { Button, Icon } from 'semantic-ui-react';
import { PRIMARY_COLOR } from '../../constants';

const ArticleFooter = ({ post }) => (
  <div>
    <Button
      as={Link}
      to={post.prevPost ? `${post.prevPost.slug}` : '/'}
      animated="fade"
      color={PRIMARY_COLOR}
      size="large"
      inverted
    >
      <Button.Content visible>
        {post.prevPost ? `${post.prevPost.title}` : 'Back to Home'}
      </Button.Content>
      {post.prevPost ? (
        <Button.Content hidden>
          <Icon name="left arrow" />
        </Button.Content>
      ) : (
        <Button.Content hidden>
          <Icon name="home" />
        </Button.Content>
      )}
    </Button>
    <Button
      as={Link}
      to={post.nextPost ? `${post.nextPost.slug}` : '/'}
      animated="fade"
      color={PRIMARY_COLOR}
      size="large"
      floated="right"
      inverted
    >
      <Button.Content visible>
        {post.nextPost ? `${post.nextPost.title}` : 'Back to Home'}
      </Button.Content>
      {post.nextPost ? (
        <Button.Content hidden>
          <Icon name="right arrow" />
        </Button.Content>
      ) : (
        <Button.Content hidden>
          <Icon name="home" />
        </Button.Content>
      )}
    </Button>
  </div>
);

export default ArticleFooter;
