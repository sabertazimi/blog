import { MetaHeader, PostsList, TagsCloud } from '@components';
import { usePostsMetadata, useSiteMetadata } from '@hooks';
import { Layout } from '@layouts';
import type { TagType } from '@types';
import type { PageProps } from 'gatsby';
import React from 'react';

interface TagsPageProps extends PageProps {
  pageContext: {
    activeTag: TagType;
  };
}

const Tags = ({ pageContext: { activeTag } }: TagsPageProps): JSX.Element => {
  const { siteUrl, title } = useSiteMetadata();
  const { posts, tags } = usePostsMetadata();
  const postsByTag = posts.filter(
    ({ tags }) => tags && tags.includes(activeTag)
  );

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <Layout banner="Tags">
        <TagsCloud tags={tags} activeTag={activeTag} />
        {activeTag && postsByTag ? (
          <PostsList posts={postsByTag} />
        ) : (
          <PostsList posts={posts} />
        )}
      </Layout>
    </div>
  );
};

export default Tags;
