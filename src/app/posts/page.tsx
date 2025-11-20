import type { Metadata } from 'next'
import { Suspense } from 'react'
import PostCard from '@/components/post-card'
import TagFilter from '@/components/tag-filter'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import DefaultLayout from '@/layouts/default-layout'
import getBuildTime from '@/lib/get-build-time'
import { getPostsMeta } from '@/lib/get-posts-data'
import { formatDate } from '@/lib/utils'

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
        <div className="absolute top-0 left-0 z-0 h-[200px] w-full mask-[linear-gradient(to_top,transparent_25%,black_95%)]">
          <FlickeringGrid
            className="absolute top-0 left-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.2}
            flickerChance={0.05}
          />
        </div>
        <div className="border-border relative z-10 flex min-h-[250px] flex-col justify-center gap-6 border-b p-6">
          <div className="container mx-auto">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold tracking-tighter md:text-5xl">Sabertaz Blog</h1>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
                Sharing technical articles and thoughts.
              </p>
            </div>
          </div>
          {allTags.length > 0 && (
            <div className="container mx-auto">
              <TagFilter tags={allTags} selectedTag={selectedTag} tagCounts={tagCounts} />
            </div>
          )}
        </div>
        <div className="container mx-auto px-6 lg:px-0">
          <Suspense fallback={<div>Loading articles...</div>}>
            <div
              className={`border-border relative grid grid-cols-1 overflow-hidden border-x md:grid-cols-2 lg:grid-cols-3 ${
                filteredPosts.length < 4 ? 'border-b' : 'border-b-0'
              }`}
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
