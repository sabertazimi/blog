import { Article, MetaHeader } from '@components';
import { PostLayout } from '@layouts';
import {
  getBuildTime,
  getPostData,
  getPostsMetadata,
  getSiteMetadata,
} from '@lib';
import type { PostMetaType, PostType, SiteMetadata } from '@types';
import { useRouter } from 'next/router';
import type { GetStaticPaths, GetStaticProps } from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

interface Props {
  buildTime: string | number | Date;
  postData: PostType;
  postsMetadata: PostMetaType[];
  siteMetadata: SiteMetadata;
}

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const postsMetadata = await getPostsMetadata();
  const paths = postsMetadata.map(({ slug }) => ({
    params: {
      slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, QueryParams> = async ({
  params,
}) => {
  const slug = (params as QueryParams).slug;
  const buildTime = getBuildTime();
  const postData = await getPostData(slug) as PostType;
  const postsMetadata = await getPostsMetadata();
  const siteMetadata = getSiteMetadata();
  return {
    props: {
      buildTime,
      postData,
      postsMetadata,
      siteMetadata,
    },
  };
};

const Post = ({
  buildTime,
  postData,
  postsMetadata,
  siteMetadata,
}: Props): JSX.Element => {
  const { disqusUrl, siteUrl, title, author, socialList } = siteMetadata;
  const { pathname: socialUrl } = useRouter();

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <PostLayout
        buildTime={buildTime}
        posts={postsMetadata}
        author={author}
        socialList={socialList}
      >
        <Article post={postData} commentUrl={disqusUrl} socialUrl={socialUrl} />
      </PostLayout>
    </div>
  );
};

export default Post;
