import type { PostMeta } from '@/types'
import { PostFooterLink } from '@/components/post-footer-link'
import { cn } from '@/lib/utils'

interface PostFooterProps {
  prevPost: PostMeta['prevPost']
  nextPost: PostMeta['nextPost']
}

export function PostFooter({ prevPost, nextPost }: PostFooterProps) {
  return (
    <div className={cn('@container grid grid-cols-2 gap-4')}>
      {prevPost && (
        <PostFooterLink
          type="previous"
          url={`/post/${prevPost.slug}`}
          title={prevPost.title}
          description={prevPost.description}
        />
      )}
      {nextPost && (
        <PostFooterLink
          type="next"
          url={`/post/${nextPost.slug}`}
          title={nextPost.title}
          description={nextPost.description}
        />
      )}
    </div>
  )
}
