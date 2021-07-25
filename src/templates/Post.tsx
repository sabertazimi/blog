import React from 'react';
import { PageProps } from 'gatsby';
import { PostType } from '@types';
import { PostLayout } from '@layouts';
import { Article } from '@components';

interface PostPageProps extends PageProps {
  pageContext: {
    post: PostType;
  };
}

const Post: React.FC<PostPageProps> = ({ pageContext: { post } }) => (
  <PostLayout>
    <Article post={post} />
  </PostLayout>
);

export default Post;
