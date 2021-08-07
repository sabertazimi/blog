import { PostsList, TagsCloud } from '@components';
import { usePostsMetadata } from '@hooks';
import { Layout } from '@layouts';
import { TagType } from '@types';
import { PageProps } from 'gatsby';
import React from 'react';

interface TagsPageProps extends PageProps {
  pageContext: {
    activeTag: TagType;
  };
}

const Tags = ({ pageContext: { activeTag } }: TagsPageProps): JSX.Element => {
  const { posts, tags } = usePostsMetadata();
  const postsByTag = posts.filter(
    ({ tags }) => tags && tags.includes(activeTag)
  );

  return (
    <Layout banner="Tags">
      <TagsCloud tags={tags} activeTag={activeTag} />
      {activeTag && postsByTag ? (
        <PostsList posts={postsByTag} />
      ) : (
        <PostsList posts={posts} />
      )}
    </Layout>
  );
};

export default Tags;
