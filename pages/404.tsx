import { NotFoundResult } from '@components'
import { Layout } from '@layouts'
import { getBuildTime, getPostsMeta } from '@lib'
import type { BuildTime, PostMeta } from '@types'
import type { GetStaticProps } from 'next/types'

interface Props {
  buildTime: BuildTime
  postsMeta: PostMeta[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const buildTime = getBuildTime()
  const postsMeta = await getPostsMeta()

  return {
    props: {
      buildTime,
      postsMeta,
    },
  }
}

const NotFound = ({ buildTime, postsMeta }: Props): JSX.Element => (
  <div>
    <Layout banner="Exploring" buildTime={buildTime} posts={postsMeta}>
      <NotFoundResult />
    </Layout>
  </div>
)

export default NotFound
