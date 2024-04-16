import { PostsList, TagsCloud } from '@components'
import { Layout } from '@layouts'
import { getBuildTime, getPostsMeta, getTagsData } from '@lib'
import type { BuildTime, PostMeta, TagsType } from '@types'
import type { GetStaticProps } from 'next/types'

interface Props {
  buildTime: BuildTime
  postsMeta: PostMeta[]
  tagsData: TagsType
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

function Tags({ buildTime, postsMeta, tagsData }: Props): JSX.Element {
  return (
    <Layout banner="Tags" buildTime={buildTime} posts={postsMeta}>
      <TagsCloud tags={tagsData} />
      <PostsList posts={postsMeta} />
    </Layout>
  )
}

export default Tags
