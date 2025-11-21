import type { Post } from '@/types'
import MDX from '@/components/mdx'
import PostThumbnailImage from '@/components/post-thumbnail-image'
import TableOfContents from '@/components/table-of-contents'

interface PostContentProps {
  post: Post
}

function PostContent({ post: { excerpt: _, source, thumbnail, title } }: PostContentProps) {
  return (
    <div className="border-border container mx-auto flex border-x px-6 lg:px-0">
      <article className="border-border min-w-0 flex-1 border-r">
        <div className="relative h-64 w-full overflow-hidden md:h-96">
          <PostThumbnailImage src={thumbnail} alt={title} enableHoverScale={false} />
        </div>
        <div className="p-6 lg:p-10">
          <MDX source={source} />
        </div>
      </article>
      <aside className="hidden w-96 shrink-0 p-6 lg:block lg:p-10">
        <div className="sticky top-24 flex h-[calc(100vh-8rem)] flex-col overflow-hidden">
          <TableOfContents />
        </div>
      </aside>
    </div>
  )
}

export default PostContent
