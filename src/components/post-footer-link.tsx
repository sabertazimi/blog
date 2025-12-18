import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface PostFooterLinkProps {
  type: 'previous' | 'next'
  url: string
  title: string
  description?: string
}

export function PostFooterLink({ type, url, title, description }: PostFooterLinkProps) {
  const t = useTranslations('common')
  const Icon = type === 'previous' ? ChevronLeftIcon : ChevronRightIcon
  const label = type === 'previous' ? t('previousPost') : t('nextPost')

  return (
    <Link
      href={url}
      aria-label={`${label}: ${title}`}
      className={cn(
        'hover:bg-accent/80 hover:text-accent-foreground flex flex-col gap-2 rounded-lg border p-4 text-sm transition-colors',
        type === 'previous' ? 'col-start-1' : 'col-start-2',
        type === 'next' && 'text-end',
        '@max-lg:col-span-full @max-lg:col-start-1',
      )}
    >
      <div className={cn('inline-flex items-center gap-1.5 font-medium', type === 'next' && 'flex-row-reverse')}>
        <Icon className="-mx-1 size-4 shrink-0 rtl:rotate-180" />
        <p className="truncate">{title}</p>
      </div>
      <p className="text-muted-foreground truncate">{description}</p>
    </Link>
  )
}
