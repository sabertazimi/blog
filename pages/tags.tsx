import { PostsList, TagsCloud } from '@components'
import { Layout } from '@layouts'
import { getBuildTime, getPostsMeta, getTagsData } from '@lib'
import type { BuildTime, PostMeta, Tags } from '@types'
import type { GetStaticProps } from 'next/types'

interface Props {
  buildTime: BuildTime
  postsMeta: PostMeta[]
  tagsData: Tags
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const buildTime = getBuildTime()
  const postsMeta = await getPostsMeta()
  const tagsData = await getTagsData()

  return {
    props: {
      buildTime,
      postsMeta,
      tagsData,
    },
  }
}

const Tags = ({ buildTime, postsMeta, tagsData }: Props): JSX.Element => (
  <Layout banner="Tags" buildTime={buildTime} posts={postsMeta}>
    <TagsCloud tags={tagsData} />
    <PostsList posts={postsMeta} />
  </Layout>
)

export default Tags
