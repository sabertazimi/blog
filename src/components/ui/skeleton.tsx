import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  const t = useTranslations('common')

  return (
    <div
      data-slot="skeleton"
      role="status"
      aria-live="polite"
      aria-label={t('loadingContent')}
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }
