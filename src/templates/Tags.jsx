import React from 'react';
import { usePostsMetadata } from '@/hooks';
import { Layout } from '@/layouts';
import { TagsCloud, PostsList } from '@/components';

const Tags = ({ pageContext: { activeTag } }) => {
  const { posts, tags } = usePostsMetadata();
  const postsByTag = posts.filter(
    (post) => post.tags && post.tags.includes(activeTag)
  );

  return (
    <Layout banner="Tags">
      <TagsCloud tags={tags} activeTag={activeTag} />
      {Boolean(activeTag && postsByTag) ? (
        <PostsList posts={postsByTag} />
      ) : (
        <PostsList posts={posts} />
      )}
    </Layout>
  );
};

export default Tags;
