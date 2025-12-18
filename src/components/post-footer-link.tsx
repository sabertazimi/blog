import type { useTranslations } from 'next-intl'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface PostFooterLinkProps {
  url: string
  title: string
  description?: string
  index: 0 | 1
  t: ReturnType<typeof useTranslations>
}

export function PostFooterLink({ url, title, description, index, t }: PostFooterLinkProps) {
  const Icon = index === 0 ? ChevronLeftIcon : ChevronRightIcon
  const label = index === 0 ? t('previousPost') : t('nextPost')

  return (
    <Link
      href={url}
      aria-label={`${label}: ${title}`}
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
