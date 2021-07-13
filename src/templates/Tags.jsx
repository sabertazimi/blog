import React from 'react';
import { usePostsMetadata } from '@/hooks';
import { Layout } from '@/layouts';
import { TagsCloud, ListPostPreviews } from '@/components';

const Tags = ({ pageContext: { activeTag } }) => {
  const { posts, tags } = usePostsMetadata();
  const postsByTag = posts.filter(
    (post) => post.tags && post.tags.includes(activeTag)
  );

  return (
    <Layout banner="Tags">
      <TagsCloud tags={tags} activeTag={activeTag} />
      {Boolean(activeTag && postsByTag) ? (
        <ListPostPreviews posts={postsByTag} />
      ) : (
        <ListPostPreviews posts={posts} />
      )}
    </Layout>
  );
};

export default Tags;
