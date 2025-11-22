import type { Post } from '@/types'
import BackToTop from '@/components/back-to-top'
import MDX from '@/components/mdx'
import { PostComment } from '@/components/post-comment'
import PostThumbnailImage from '@/components/post-thumbnail-image'
import TableOfContents from '@/components/table-of-contents'
import { siteConfig } from '@/lib/site'

interface PostContentProps {
  post: Post
}

function PostContent({ post: { source, thumbnail, title, slug } }: PostContentProps) {
  return (
    <div className="border-border container mx-auto flex border-x px-6 lg:px-0">
      <article className="border-border min-w-0 flex-1 border-r">
        <div className="relative h-64 w-full overflow-hidden md:h-96">
          <PostThumbnailImage src={thumbnail} alt={title} enableHoverScale={false} />
        </div>
        <div className="p-6 lg:p-10">
          <MDX source={source} />
        </div>
        <div className="px-6 lg:px-10">
          <PostComment slug={slug} url={`${siteConfig.url}/post/${slug}`} />
        </div>
      </article>
      <aside className="hidden w-96 shrink-0 p-6 lg:block lg:p-10">
        <div className="sticky top-24 flex h-[calc(100vh-8rem)] flex-col overflow-hidden">
          <TableOfContents />
        </div>
      </aside>
      <BackToTop />
    </div>
  )
}

export default PostContent
