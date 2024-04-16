import { BooksGrid } from '@components'
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

function Books({ buildTime, postsMeta }: Props): JSX.Element {
  return (
    <Layout banner="Books" buildTime={buildTime} posts={postsMeta}>
      <BooksGrid />
    </Layout>
  )
}

export default Books
