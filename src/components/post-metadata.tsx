import { Calendar, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PostMetadataProps {
  date: string
  readingTime?: number
  className?: string
}

function PostMetadata({ date, readingTime, className }: PostMetadataProps) {
  return (
    <>
      <time
        dateTime={date}
        className={cn('text-muted-foreground flex items-center gap-1.5 text-sm font-medium', className)}
      >
        <Calendar className="size-4" />
        {date}
      </time>
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
