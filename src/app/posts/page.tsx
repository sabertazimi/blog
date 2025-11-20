import type { Metadata } from 'next'
import { Suspense } from 'react'
import PageHeader from '@/components/page-header'
import PostCard from '@/components/post-card'
import TagFilter from '@/components/tag-filter'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostsData, getPostsMeta, getTagsData } from '@/lib/get-posts-data'
import { cn, formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Posts',
}

export default async function Posts({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const buildTime = getBuildTime()
  const resolvedSearchParams = await searchParams
  const postsData = await getPostsData()
  const postsMeta = await getPostsMeta(postsData)
  const { allTags, tagCounts } = await getTagsData(postsData)
  const selectedTag = resolvedSearchParams.tag !== undefined && resolvedSearchParams.tag !== '' ? resolvedSearchParams.tag : 'All'
  const filteredPosts = selectedTag === 'All' ? postsMeta : postsMeta.filter(post => post.tags?.includes(selectedTag))

  return (
    <DefaultLayout buildTime={buildTime} posts={postsMeta}>
      <div className="bg-background relative min-h-screen">
        <PageHeader title="Sabertaz Blog" description="Sharing technical articles and thoughts.">
          {allTags.length > 0 && <TagFilter tags={allTags} selectedTag={selectedTag} tagCounts={tagCounts} />}
        </PageHeader>
        <div className="container mx-auto px-6 lg:px-0">
          <Suspense fallback={<div>Loading articles...</div>}>
            <div
              className={cn(
                'border-border relative grid grid-cols-1 overflow-hidden border-x md:grid-cols-2 lg:grid-cols-3',
                filteredPosts.length < 4 ? 'border-b' : 'border-b-0',
              )}
            >
              {filteredPosts.map((post) => {
                const formattedDate = formatDate(post.createTime)

                return (
                  <PostCard
                    key={post.slug}
                    url={`/posts/${post.slug}`}
                    title={post.title}
                    description={post.description}
                    thumbnail={post.thumbnail}
                    date={formattedDate}
                    readingTime={post.readingTime}
                    showRightBorder={filteredPosts.length < 3}
                  />
                )
              })}
            </div>
          </Suspense>
        </div>
      </div>
    </DefaultLayout>
  )
}
