import type { ParsedUrlQuery } from 'node:querystring'
import { Article } from '@components'
import { PostLayout } from '@layouts'
import { getBuildTime, getPostData, getPostsMeta } from '@lib'
import type { BuildTime, PostMeta, PostType } from '@types'
import 'katex/dist/katex.css'
import type { GetStaticPaths, GetStaticProps } from 'next/types'

interface Props {
  buildTime: BuildTime
  postData: PostType
  postsMeta: PostMeta[]
}

interface QueryParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const postsMeta = await getPostsMeta()
  const paths = postsMeta.map(({ slug }) => ({
    params: {
      slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, QueryParams> = async ({
  params,
}) => {
  const slug = (params as QueryParams).slug
  const buildTime = getBuildTime()
  const postData = (await getPostData(slug)) as PostType
  const postsMeta = await getPostsMeta()

  return {
    props: {
      buildTime,
      postData,
      postsMeta,
    },
  }
}

function Post({ buildTime, postData, postsMeta }: Props): JSX.Element {
  return (
    <PostLayout
      banner={`${postData.title}`}
      buildTime={buildTime}
      posts={postsMeta}
    >
      <Article post={postData} />
    </PostLayout>
  )
}

export default Post
