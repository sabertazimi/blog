import type { ParsedUrlQuery } from 'node:querystring'
import type { Metadata } from 'next'
import { PostsList, TagsCloud } from '@/components'
import { getMetadata } from '@/config'
import { Layout } from '@/layouts'
import { getBuildTime, getPostsMeta, getTagsData } from '@/lib'

interface QueryParams extends ParsedUrlQuery {
  tag: string
}

export async function generateStaticParams() {
  const tagsData = await getTagsData()
  return Object.keys(tagsData).map(tag => ({
    tag,
  }))
}

export async function generateMetadata({ params }: { params: QueryParams }): Promise<Metadata> {
  return getMetadata({ title: params.tag })
}

export default async function Tags({ params }: { params: QueryParams }) {
  const buildTime = getBuildTime()
  const postsMeta = await getPostsMeta()
  const tagsData = await getTagsData()
  const activeTag = params.tag

  const postsMetaByTag = postsMeta.filter(
    ({ tags }) => tags && tags.includes(activeTag),
  )

  return (
    <Layout banner={activeTag} buildTime={buildTime} posts={postsMeta}>
      <TagsCloud tags={tagsData} activeTag={activeTag} />
      <PostsList posts={postsMetaByTag} />
    </Layout>
  )
}
