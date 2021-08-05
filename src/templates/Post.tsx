import React from 'react';
import { PageProps } from 'gatsby';
import { useLocation } from '@reach/router';
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
  const { href: socialUrl } = useLocation();

  return (
    <PostLayout>
      <Article post={post} commentUrl={disqusUrl} socialUrl={socialUrl} />
    </PostLayout>
  );
};

export default Post;
