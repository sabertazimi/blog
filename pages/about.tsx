import { GithubCard, MetaHeader } from '@components';
import { Layout } from '@layouts';
import {
  getBuildTime,
  getGitHubData,
  getPostsMetadata,
  getSiteMetadata,
} from '@lib';
import type { GitHubType, PostMetaType, SiteMetadata } from '@types';
import type { GetStaticProps } from 'next/types';
import React from 'react';

interface Props {
  buildTime: string | number | Date;
  githubData: GitHubType;
  postsMetadata: PostMetaType[];
  siteMetadata: SiteMetadata;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const buildTime = getBuildTime();
  const githubData = await getGitHubData();
  const postsMetadata = await getPostsMetadata();
  const siteMetadata = getSiteMetadata();
  return {
    props: {
      buildTime,
      githubData,
      postsMetadata,
      siteMetadata,
    },
  };
};

const About = ({
  buildTime,
  githubData,
  postsMetadata,
  siteMetadata,
}: Props): JSX.Element => {
  const { siteUrl, title, author, email, socialList } = siteMetadata;
  const { profile, repos } = githubData;

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <Layout
        banner="About Me"
        posts={postsMetadata}
        buildTime={buildTime}
        author={author}
        socialList={socialList}
      >
        <GithubCard email={email} profile={profile} repos={repos} />
      </Layout>
    </div>
  );
};

export default About;
