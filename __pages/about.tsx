import { GithubCard } from '@components'
import { Layout } from '@layouts'
import { getBuildTime, getGitHubData, getPostsMeta } from '@lib'
import type { BuildTime, GitHub, PostMeta } from '@types'
import type { GetStaticProps } from 'next/types'

interface Props {
  buildTime: BuildTime
  githubData: GitHub
  postsMeta: PostMeta[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const buildTime = getBuildTime()
  const githubData = await getGitHubData()
  const postsMeta = await getPostsMeta()

  return {
    props: {
      buildTime,
      githubData,
      postsMeta,
    },
  }
}

function About({
  buildTime,
  githubData: { profile, repos },
  postsMeta,
}: Props): JSX.Element {
  return (
    <Layout banner="About Me" buildTime={buildTime} posts={postsMeta}>
      <GithubCard profile={profile} repos={repos} />
    </Layout>
  )
}

export default About
