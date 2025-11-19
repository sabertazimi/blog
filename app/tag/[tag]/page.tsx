import type { Metadata } from 'next'
import type { ParsedUrlQuery } from 'node:querystring'
import { PostsList, TagsCloud } from '@/components'
import { getMetadata } from '@/config'
import { Layout } from '@/layouts'
import { getBuildTime, getPostsData, getPostsMeta, getTagsData } from '@/lib'

interface QueryParams extends ParsedUrlQuery {
  tag: string
}

export async function generateStaticParams() {
  const tagsData = await getTagsData()
  return Object.keys(tagsData).map(tag => ({
    tag,
  }))
}

export async function generateMetadata({ params }: { params: Promise<QueryParams> }): Promise<Metadata> {
  const { tag } = await params
  return getMetadata({ title: decodeURI(tag) })
}

export default async function Tags({ params }: { params: Promise<QueryParams> }) {
  const { tag } = await params
  const buildTime = getBuildTime()
  const postsData = await getPostsData()
  const postsMeta = await getPostsMeta(postsData)
  const tagsData = await getTagsData(postsData)
  const activeTag = decodeURI(tag)

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
