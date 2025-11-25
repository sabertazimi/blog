import { CalendarIcon, ClockIcon, SquarePenIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import FormattedDate from '@/components/formatted-date'
import { cn } from '@/lib/utils'

interface PostMetadataProps {
  createTime?: string
  updateTime?: string
  readingTime?: number
  className?: string
}

function PostMetadata({ createTime, updateTime, readingTime, className }: PostMetadataProps) {
  const t = useTranslations('post')

  return (
    <>
      {createTime !== undefined && createTime !== '' && (
        <FormattedDate
          date={createTime}
          icon={CalendarIcon}
          className={cn('text-muted-foreground text-sm font-medium', className)}
        />
      )}
      {updateTime !== undefined && updateTime !== '' && (
        <FormattedDate
          date={updateTime}
          icon={SquarePenIcon}
          className={cn('text-muted-foreground text-sm font-medium', className)}
        />
      )}
      {readingTime !== undefined && readingTime !== 0 && (
        <span className={cn('text-muted-foreground flex items-center gap-1.5 text-sm font-medium', className)}>
          <ClockIcon className="size-4" />
          {readingTime}
          {' '}
          {t('readingTime')}
        </span>
      )}
    </>
  )
}

export default PostMetadata
