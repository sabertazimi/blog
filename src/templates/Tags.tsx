import React from 'react';
import { PageProps } from 'gatsby';
import { PostType, TagType } from '@types';
import { usePostsMetadata } from '@hooks';
import { Layout } from '@layouts';
import { TagsCloud, PostsList } from '@components';

interface TagsPageProps extends PageProps {
  pageContext: {
    activeTag: TagType;
  }
}

const Tags: React.FC<TagsPageProps> = ({ pageContext: { activeTag } }) => {
  const { posts, tags } = usePostsMetadata();
  const postsByTag = posts.filter(
    (post: PostType) => post.tags && post.tags.includes(activeTag)
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
