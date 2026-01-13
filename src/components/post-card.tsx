import { PostImage } from '@/components/post-image'
import { PostMetadata } from '@/components/post-metadata'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface PostCardProps {
  url: string
  title: string
  description?: string
  thumbnail?: string
  createTime?: string
  readingTime?: number
  showRightBorder?: boolean
}

export function PostCard({
  url,
  title,
  description,
  thumbnail,
  createTime,
  readingTime,
  showRightBorder = true,
}: PostCardProps) {
  // Render post card with thumbnail and metadata
  return (
    <Link
      href={url}
      className={cn(
        'group before:bg-border after:bg-border relative block before:absolute before:top-0 before:-left-0.5 before:z-10 before:h-screen before:w-px before:content-[\'\'] after:absolute after:-top-0.5 after:left-0 after:z-0 after:h-px after:w-screen after:content-[\'\']',
        showRightBorder && 'border-border border-b-0 md:border-r',
      )}
    >
      <div className="flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <PostImage src={thumbnail} alt={title} hoverScale />
        </div>
        <div className="flex min-h-[200px] flex-col gap-2 p-6">
          <h2
            className="text-card-foreground text-xl font-semibold underline-offset-4 group-hover:underline"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {description !== undefined && description !== '' && (
            <p className="text-muted-foreground line-clamp-3 text-sm">{description}</p>
          )}
          <div className="mt-auto flex items-center justify-between">
            <PostMetadata createTime={createTime} readingTime={readingTime} />
          </div>
        </div>
      </div>
    </Link>
  )
}
