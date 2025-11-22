import { Calendar, Clock, SquarePen } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'

interface PostMetadataProps {
  createTime?: string
  updateTime?: string
  readingTime?: number
  className?: string
}

function PostMetadata({ createTime, updateTime, readingTime, className }: PostMetadataProps) {
  return (
    <>
      {createTime !== undefined && createTime !== '' && (
        <time
          dateTime={createTime}
          className={cn('text-muted-foreground flex items-center gap-1.5 text-sm font-medium', className)}
        >
          <Calendar className="size-4" />
          {formatDate(createTime)}
        </time>
      )}
      {updateTime !== undefined && updateTime !== '' && (
        <time
          dateTime={updateTime}
          className={cn('text-muted-foreground flex items-center gap-1.5 text-sm font-medium', className)}
        >
          <SquarePen className="size-4" />
          {formatDate(updateTime)}
        </time>
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
