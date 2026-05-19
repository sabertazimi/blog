import type { LucideIcon } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { cn } from '@/lib/utils'

interface FormattedDateProps {
  date: string | number | Date | undefined | null
  showTime?: boolean
  className?: string
  icon?: LucideIcon
}

export function FormattedDate({ date, showTime = false, className, icon: Icon }: FormattedDateProps) {
  const format = useFormatter()

  if (date === undefined || date === null) {
    return null
  }

  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date

  const formattedContent = showTime
    ? format.dateTime(dateObj, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : format.dateTime(dateObj, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })

  return (
    <time
      dateTime={dateObj.toISOString()}
      className={cn(Icon !== undefined && 'inline-flex items-center gap-1.5', className)}
    >
      {Icon !== undefined && <Icon className="size-4" />}
      {formattedContent}
    </time>
  )
}
