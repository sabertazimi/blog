import type { PostMeta } from '@/types'
import { Suspense } from 'react'
import PostCard from '@/components/post-card'
import { cn, formatDate } from '@/lib/utils'

interface PostListProps {
  postsMeta: PostMeta[]
  selectedTag: string
}

function PostList({ postsMeta, selectedTag }: PostListProps) {
  const filteredPosts = selectedTag === 'All' ? postsMeta : postsMeta.filter(post => post.tags?.includes(selectedTag))

  return (
    <div className="container mx-auto px-6 lg:px-0">
      <Suspense fallback={<div>Loading articles...</div>}>
        <div
          className={cn(
            'border-border relative grid grid-cols-1 overflow-hidden border-x md:grid-cols-2 lg:grid-cols-3',
            filteredPosts.length < 4 ? 'border-b' : 'border-b-0',
          )}
        >
          {filteredPosts.map(post => (
            <PostCard
              key={post.slug}
              url={`/post/${post.slug}`}
              title={post.title}
              description={post.description}
              thumbnail={post.thumbnail}
              date={formatDate(post.createTime)}
              readingTime={post.readingTime}
              showRightBorder={filteredPosts.length < 3}
            />
          ))}
        </div>
      </Suspense>
    </div>
  )
}

export default PostList
