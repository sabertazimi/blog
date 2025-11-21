import { Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import PostCardImage from '@/components/post-card-image'
import { DotPattern } from '@/components/ui/dot-pattern'
import { cn } from '@/lib/utils'

interface PostCardProps {
  url: string
  title: string
  description?: string
  date: string
  thumbnail?: string
  readingTime?: number
  showRightBorder?: boolean
}

function PostCard({ url, title, description, date, thumbnail, readingTime, showRightBorder = true }: PostCardProps) {
  const hasThumbnail = thumbnail !== undefined && thumbnail !== ''

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
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className="fill-muted-foreground/20 transition-transform duration-300 group-hover:scale-105"
          />

          {hasThumbnail && <PostCardImage src={thumbnail} alt={title} />}
        </div>
        <div className="flex min-h-[200px] flex-col gap-2 p-6">
          <h3 className="text-card-foreground text-xl font-semibold underline-offset-4 group-hover:underline">
            {title}
          </h3>
          {description !== undefined && description !== '' && (
            <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>
          )}
          <div className="text-muted-foreground mt-auto flex items-center justify-between text-sm font-medium">
            <time dateTime={date} className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {date}
            </time>
            {readingTime !== undefined && readingTime !== 0 && (
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                {readingTime}
                {' '}
                min
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
