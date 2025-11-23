import type { Post } from '@/types'
import BackToTop from '@/components/back-to-top'
import { PostComment } from '@/components/post-comment'
import PostContent from '@/components/post-content'
import PostFooter from '@/components/post-footer'
import PostImage from '@/components/post-image'
import TableOfContents from '@/components/table-of-contents'
import { siteConfig } from '@/lib/site'

interface PostLayoutProps {
  post: Post
}

function PostLayout({ post: { source, thumbnail, title, slug, prevPost, nextPost } }: PostLayoutProps) {
  return (
    <div className="border-border container mx-auto flex px-4 lg:border-r lg:px-0">
      <article className="border-border min-w-0 flex-1 border-x">
        <div className="relative h-64 w-full overflow-hidden md:h-96">
          <PostImage src={thumbnail} alt={title} />
        </div>
        <div className="p-6 lg:p-10">
          <PostContent source={source} />
        </div>
        <div className="border-border border-t px-6 pt-3 lg:px-10 lg:pt-5">
          <PostComment slug={slug} url={`${siteConfig.url}/post/${slug}`} />
        </div>
        <div className="border-border border-t p-6 lg:p-10">
          <PostFooter prevPost={prevPost} nextPost={nextPost} />
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

export default PostLayout
