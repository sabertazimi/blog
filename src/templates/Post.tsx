import { Article, MetaHeader } from '@components';
import { useSiteMetadata } from '@hooks';
import { PostLayout } from '@layouts';
import { useLocation } from '@reach/router';
import { PostType } from '@types';
import type { PageProps } from 'gatsby';
import React from 'react';

interface PostPageProps extends PageProps {
  pageContext: {
    post: PostType;
  };
}

const Post = ({ pageContext: { post } }: PostPageProps): JSX.Element => {
  const { disqusUrl, siteUrl, title } = useSiteMetadata();
  const { href: socialUrl } = useLocation();

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <PostLayout>
        <Article post={post} commentUrl={disqusUrl} socialUrl={socialUrl} />
      </PostLayout>
    </div>
  );
};

export default Post;
