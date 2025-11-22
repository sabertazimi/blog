import { Calendar, Clock, SquarePen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PostMetadataProps {
  date: string
  readingTime?: number
  updateTime?: string
  className?: string
}

function PostMetadata({ date, readingTime, updateTime, className }: PostMetadataProps) {
  return (
    <>
      <time
        dateTime={date}
        className={cn('text-muted-foreground flex items-center gap-1.5 text-sm font-medium', className)}
      >
        <Calendar className="size-4" />
        {date}
      </time>
      {updateTime !== undefined && updateTime !== '' && (
        <span className={cn('text-muted-foreground flex items-center gap-1.5 text-sm font-medium', className)}>
          <SquarePen className="size-4" />
          {updateTime}
        </span>
      )}
      {readingTime !== undefined && readingTime !== 0 && (
        <span className={cn('text-muted-foreground flex items-center gap-1.5 text-sm font-medium', className)}>
          <Clock className="size-4" />
          {readingTime}
          {' '}
          min
        </span>
      )}
    </>
  )
}

export default PostMetadata
