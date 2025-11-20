import type { PostMeta, Tag, Tags } from '@/types'
import { Suspense } from 'react'
import PageHeader from '@/components/page-header'
import PostCard from '@/components/post-card'
import TagFilter from '@/components/tag-filter'
import { routes, ROUTES_INDEX } from '@/lib/routes'
import { cn, formatDate } from '@/lib/utils'

interface PostsListProps {
  postsMeta: PostMeta[]
  allTags: Tag[]
  tagCounts: Tags
  selectedTag: string
}

function PostsList({ postsMeta, allTags, tagCounts, selectedTag }: PostsListProps) {
  const filteredPosts = selectedTag === 'All' ? postsMeta : postsMeta.filter(post => post.tags?.includes(selectedTag))

  return (
    <>
      <PageHeader title={routes[ROUTES_INDEX.posts].title} description={routes[ROUTES_INDEX.posts].description}>
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
    </>
  )
}

export default PostsList
