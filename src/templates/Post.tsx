import React from 'react';
import { PageProps } from 'gatsby';
import { PostType } from '@types';
import { useSiteMetadata } from '@hooks';
import { PostLayout } from '@layouts';
import { Article } from '@components';

interface PostPageProps extends PageProps {
  pageContext: {
    post: PostType;
  };
}

const Post = ({ pageContext: { post } }: PostPageProps): JSX.Element => {
  const { disqusUrl } = useSiteMetadata();

  return (
    <PostLayout>
      <Article post={post} url={disqusUrl} />
    </PostLayout>
  );
};

export default Post;
