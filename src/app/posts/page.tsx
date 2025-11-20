import type { Metadata } from 'next'
import { Suspense } from 'react'
import PageHeader from '@/components/page-header'
import PostCard from '@/components/post-card'
import TagFilter from '@/components/tag-filter'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostsMeta } from '@/lib/get-posts-data'
import { cn, formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Posts',
}

export default async function Posts({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const buildTime = getBuildTime()
  const resolvedSearchParams = await searchParams
  const postsMeta = await getPostsMeta()

  const sortedPosts = [...postsMeta].sort((a, b) => {
    const dateA = a.createTime !== undefined && a.createTime !== '' ? new Date(a.createTime).getTime() : 0
    const dateB = b.createTime !== undefined && b.createTime !== '' ? new Date(b.createTime).getTime() : 0
    return dateB - dateA
  })

  const allTags = ['All', ...Array.from(new Set(sortedPosts.flatMap(post => post.tags || []))).sort()]
  const selectedTag
    = resolvedSearchParams.tag !== undefined && resolvedSearchParams.tag !== '' ? resolvedSearchParams.tag : 'All'

  const filteredPosts
    = selectedTag === 'All' ? sortedPosts : sortedPosts.filter(post => post.tags?.includes(selectedTag))
  const tagCounts = allTags.reduce(
    (acc, tag) => {
      if (tag === 'All') {
        acc[tag] = sortedPosts.length
      } else {
        acc[tag] = sortedPosts.filter(post => post.tags?.includes(tag)).length
      }
      return acc
    },
    {} as Record<string, number>,
  )

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
