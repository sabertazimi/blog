import type { Post } from '@/types'
import MDX from '@/components/mdx'
import PostThumbnailImage from '@/components/post-thumbnail-image'

interface PostContentProps {
  post: Post
}

function PostContent({ post: { excerpt: _, source, thumbnail, title } }: PostContentProps) {
  return (
    <div className="border-border container mx-auto flex border-x px-6 lg:px-0">
      <article className="border-border flex-1 border-r min-w-0">
        <div className="relative h-64 w-full overflow-hidden md:h-96">
          <PostThumbnailImage src={thumbnail} alt={title} enableHoverScale={false} />
        </div>
        <div className="p-6 lg:p-10">
          <MDX source={source} />
        </div>
      </article>
      <aside className="bg-muted/60 dark:bg-muted/20 hidden w-96 shrink-0 p-6 lg:block lg:p-10">
        {/* TODO: Add table of contents, related posts, author info, or other sidebar content here in the future */}
      </aside>
    </div>
  )
}

export default PostContent
