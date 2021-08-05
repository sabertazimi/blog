import React from 'react';
import { PageProps } from 'gatsby';
import { PostMetaType, TagType } from '@types';
import { usePostsMetadata } from '@hooks';
import { Layout } from '@layouts';
import { TagsCloud, PostsList } from '@components';

interface TagsPageProps extends PageProps {
  pageContext: {
    activeTag: TagType;
  };
}

const Tags = ({ pageContext: { activeTag } }: TagsPageProps): JSX.Element => {
  const { posts, tags } = usePostsMetadata();
  const postsByTag = posts.filter(
    (post: PostMetaType) => post.tags && post.tags.includes(activeTag)
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
