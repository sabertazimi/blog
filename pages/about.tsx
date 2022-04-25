import { GithubCard } from '@components';
import { Layout } from '@layouts';
import { getBuildTime, getGitHubData, getPostsMeta } from '@lib';
import type { GitHub, PostMeta } from '@types';
import type { GetStaticProps } from 'next/types';

interface Props {
  buildTime: string | number | Date;
  githubData: GitHub;
  postsMeta: PostMeta[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const buildTime = getBuildTime();
  const githubData = await getGitHubData();
  const postsMeta = await getPostsMeta();

  return {
    props: {
      buildTime,
      githubData,
      postsMeta,
    },
  };
};

const About = ({
  buildTime,
  githubData: { profile, repos },
  postsMeta,
}: Props): JSX.Element => (
  <Layout banner="About Me" buildTime={buildTime} posts={postsMeta}>
    <GithubCard profile={profile} repos={repos} />
  </Layout>
);

export default About;
