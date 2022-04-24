import { GithubCard, MetaHeader } from '@components';
import { Layout } from '@layouts';
import {
  getBuildTime,
  getGitHubData,
  getPostsMeta,
  getSiteConfig
} from '@lib';
import type { GitHubType, PostMetaType, SiteConfig } from '@types';
import type { GetStaticProps } from 'next/types';
import React from 'react';

interface Props {
  buildTime: string | number | Date;
  githubData: GitHubType;
  postsMeta: PostMetaType[];
  siteConfig: SiteConfig;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const buildTime = getBuildTime();
  const githubData = await getGitHubData();
  const postsMeta = await getPostsMeta();
  const siteConfig = getSiteConfig();
  return {
    props: {
      buildTime,
      githubData,
      postsMeta,
      siteConfig,
    },
  };
};

const About = ({
  buildTime,
  githubData,
  postsMeta,
  siteConfig,
}: Props): JSX.Element => {
  const { siteUrl, title, author, email, socialList } = siteConfig;
  const { profile, repos } = githubData;

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <Layout
        banner="About Me"
        posts={postsMeta}
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
