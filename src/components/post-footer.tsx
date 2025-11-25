import type { PostMeta } from '@/types'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface PostFooterProps {
  prevPost: PostMeta['prevPost']
  nextPost: PostMeta['nextPost']
}

function PostFooter({ prevPost, nextPost }: PostFooterProps) {
  return (
    <div className={cn('@container grid grid-cols-2 gap-4')}>
      {prevPost && (
        <PostFooterItem
          url={`/post/${prevPost.slug}`}
          title={prevPost.title}
          description={prevPost.description}
          index={0}
        />
      )}
      {nextPost && (
        <PostFooterItem
          url={`/post/${nextPost.slug}`}
          title={nextPost.title}
          description={nextPost.description}
          index={1}
        />
      )}
    </div>
  )
}

function PostFooterItem({
  url,
  title,
  description,
  index,
}: {
  url: string
  title: string
  description?: string
  index: 0 | 1
}) {
  const Icon = index === 0 ? ChevronLeftIcon : ChevronRightIcon

  return (
    <Link
      href={url}
      aria-label={`${index === 0 ? 'Previous' : 'Next'} post: ${title}`}
      className={cn(
        'hover:bg-accent/80 hover:text-accent-foreground flex flex-col gap-2 rounded-lg border p-4 text-sm transition-colors',
        index === 0 ? 'col-start-1' : 'col-start-2',
        index === 1 && 'text-end',
        '@max-lg:col-span-full @max-lg:col-start-1',
      )}
    >
      <div className={cn('inline-flex items-center gap-1.5 font-medium', index === 1 && 'flex-row-reverse')}>
        <Icon className="-mx-1 size-4 shrink-0 rtl:rotate-180" />
        <p className="truncate">{title}</p>
      </div>
      <p className="text-muted-foreground truncate">{description}</p>
    </Link>
  )
}

export default PostFooter
