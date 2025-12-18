import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  BadgeInfoIcon,
  CheckCheckIcon,
  CircleXIcon,
  FlameIcon,
  LightbulbIcon,
  NotebookPenIcon,
  ShieldAlertIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

interface MDXAdmonitionProps {
  type?: string
  title?: string
  children?: ReactNode
  className?: string
}

type ColorVariant = 'green' | 'blue' | 'yellow' | 'red'
type AdmonitionVariant = 'success' | 'tip' | 'info' | 'note' | 'warning' | 'caution' | 'error' | 'danger'

const colorStyles: Record<
  ColorVariant,
  {
    className: string
    descriptionClassName: string
  }
> = {
  green: {
    className: 'bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400',
    descriptionClassName: 'text-green-600/80 dark:text-green-400/80',
  },
  blue: {
    className: 'bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400',
    descriptionClassName: 'text-blue-600/80 dark:text-blue-400/80',
  },
  yellow: {
    className: 'bg-yellow-600/10 text-yellow-600 dark:bg-yellow-400/10 dark:text-yellow-400',
    descriptionClassName: 'text-yellow-600/80 dark:text-yellow-400/80',
  },
  red: {
    className: 'bg-red-600/10 text-red-600 dark:bg-red-400/10 dark:text-red-400',
    descriptionClassName: 'text-red-600/80 dark:text-red-400/80',
  },
}

const admonitionConfig: Record<
  AdmonitionVariant,
  {
    icon: LucideIcon
    color: ColorVariant
  }
> = {
  success: { icon: CheckCheckIcon, color: 'green' },
  tip: { icon: LightbulbIcon, color: 'green' },
  info: { icon: BadgeInfoIcon, color: 'blue' },
  note: { icon: NotebookPenIcon, color: 'blue' },
  warning: { icon: TriangleAlertIcon, color: 'yellow' },
  caution: { icon: ShieldAlertIcon, color: 'yellow' },
  error: { icon: CircleXIcon, color: 'red' },
  danger: { icon: FlameIcon, color: 'red' },
}

const validTypes = new Set<string>(Object.keys(admonitionConfig))

function normalizeType(type?: string): AdmonitionVariant {
  if (type !== undefined && validTypes.has(type)) {
    return type as AdmonitionVariant
  }

  return 'info'
}

export function MDXAdmonition({ type, title, children, className, ...props }: MDXAdmonitionProps) {
  const t = useTranslations('admonition')
  const normalizedType = normalizeType(type)
  const displayTitle = title !== undefined && title !== '' ? title : t(normalizedType)
  const { icon: Icon, color } = admonitionConfig[normalizedType]
  const styles = colorStyles[color]

  return (
    <Alert
      className={cn(
        'my-6',
        '[&_p]:my-2 [&_p]:text-sm [&_p]:leading-relaxed',
        '[&_ul]:my-2 [&_ul]:text-sm',
        '[&_ol]:my-2 [&_ol]:text-sm',
        '[&_li]:my-0.5',
        '[&_code]:text-xs',
        '[&_a]:text-sm',
        styles.className,
        className,
      )}
      {...props}
    >
      <Icon />
      <AlertTitle>{displayTitle}</AlertTitle>
      <AlertDescription className={styles.descriptionClassName}>{children}</AlertDescription>
    </Alert>
  )
}
