import type { ParsedUrlQuery } from 'node:querystring'
import type { Metadata } from 'next'
import { Article } from '@/components'
import { getMetadata } from '@/config'
import { PostLayout } from '@/layouts'
import { getBuildTime, getPostData, getPostsMeta } from '@/lib'
import 'katex/dist/katex.css'

interface QueryParams extends ParsedUrlQuery {
  slug: string
}

export async function generateStaticParams() {
  const postsMeta = await getPostsMeta()
  return postsMeta.map(({ slug }) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: QueryParams }): Promise<Metadata> {
  const postData = await getPostData(params.slug)
  return postData ? getMetadata({ title: postData.title }) : getMetadata()
}

export default async function Post({ params }: { params: QueryParams }) {
  const buildTime = getBuildTime()
  const postsMeta = await getPostsMeta()
  const postData = await getPostData(params.slug)

  return (
    postData && (
      <PostLayout
        buildTime={buildTime}
        posts={postsMeta}
      >
        <Article post={postData} />
      </PostLayout>
    )
  )
}
