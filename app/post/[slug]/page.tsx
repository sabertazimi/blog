import type { Metadata } from 'next'
import type { ParsedUrlQuery } from 'node:querystring'
import { Article } from '@/components'
import { getMetadata } from '@/config'
import { PostLayout } from '@/layouts'
import { getBuildTime, getPostData, getPostsData, getPostsMeta } from '@/lib'
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
  const postsData = await getPostsData()
  const postsMeta = await getPostsMeta(postsData)
  const postData = await getPostData(params.slug, postsData)

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
