import { Article, MetaHeader } from '@components';
import { PostLayout } from '@layouts';
import {
  getBuildTime,
  getPostData,
  getPostsMeta,
  getSiteConfig,
} from '@lib';
import type { PostMetaType, PostType, SiteConfig } from '@types';
import { useRouter } from 'next/router';
import type { GetStaticPaths, GetStaticProps } from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

interface Props {
  buildTime: string | number | Date;
  postData: PostType;
  postsMeta: PostMetaType[];
  siteConfig: SiteConfig;
}

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const postsMeta = await getPostsMeta();
  const paths = postsMeta.map(({ slug }) => ({
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
  const postsMeta = await getPostsMeta();
  const siteConfig = getSiteConfig();
  return {
    props: {
      buildTime,
      postData,
      postsMeta,
      siteConfig,
    },
  };
};

const Post = ({
  buildTime,
  postData,
  postsMeta,
  siteConfig,
}: Props): JSX.Element => {
  const { disqusUrl, siteUrl, title, author, socialList } = siteConfig;
  const { pathname: socialUrl } = useRouter();

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <PostLayout
        buildTime={buildTime}
        posts={postsMeta}
        author={author}
        socialList={socialList}
      >
        <Article post={postData} commentUrl={disqusUrl} socialUrl={socialUrl} />
      </PostLayout>
    </div>
  );
};

export default Post;
