import type { PostMeta } from '@/types'
import { useTranslations } from 'next-intl'
import { PostFooterLink } from '@/components/post-footer-link'
import { cn } from '@/lib/utils'

interface PostFooterProps {
  prevPost: PostMeta['prevPost']
  nextPost: PostMeta['nextPost']
}

export function PostFooter({ prevPost, nextPost }: PostFooterProps) {
  const t = useTranslations('common')

  return (
    <div className={cn('@container grid grid-cols-2 gap-4')}>
      {prevPost && (
        <PostFooterLink
          url={`/post/${prevPost.slug}`}
          title={prevPost.title}
          description={prevPost.description}
          index={0}
          t={t}
        />
      )}
      {nextPost && (
        <PostFooterLink
          url={`/post/${nextPost.slug}`}
          title={nextPost.title}
          description={nextPost.description}
          index={1}
          t={t}
        />
      )}
    </div>
  )
}
