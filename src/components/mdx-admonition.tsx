import type { ReactNode } from 'react'
import { BadgeInfoIcon, CheckCheckIcon, CircleXIcon, TriangleAlertIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

interface MDXAdmonitionProps {
  type: string
  title?: string
  children?: ReactNode
  className?: string
}

type AdmonitionType = 'success' | 'info' | 'warning' | 'error'

function normalizeType(type?: string): AdmonitionType {
  switch (type) {
    case 'success':
    case 'tip':
      return 'success'
    case 'info':
    case 'note':
      return 'info'
    case 'warning':
    case 'caution':
      return 'warning'
    case 'error':
    case 'danger':
      return 'error'
    case undefined:
    default:
      return 'info'
  }
}

const admonitionConfig = {
  success: {
    icon: CheckCheckIcon,
    className: 'bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400',
    descriptionClassName: 'text-green-600/80 dark:text-green-400/80',
  },
  info: {
    icon: BadgeInfoIcon,
    className: 'bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400',
    descriptionClassName: 'text-blue-600/80 dark:text-blue-400/80',
  },
  warning: {
    icon: TriangleAlertIcon,
    className: 'bg-yellow-600/10 text-yellow-600 dark:bg-yellow-400/10 dark:text-yellow-400',
    descriptionClassName: 'text-yellow-600/80 dark:text-yellow-400/80',
  },
  error: {
    icon: CircleXIcon,
    className: 'bg-red-600/10 text-red-600 dark:bg-red-400/10 dark:text-red-400',
    descriptionClassName: 'text-red-600/80 dark:text-red-400/80',
  },
} as const

function MDXAdmonition({ type, title, children, className, ...props }: MDXAdmonitionProps) {
  const normalizedType = normalizeType(type)
  const config = admonitionConfig[normalizedType]
  const Icon = config.icon

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
        config.className,
        className,
      )}
      {...props}
    >
      <Icon />
      <AlertTitle>
        {title !== undefined && title !== '' ? title : type.charAt(0).toUpperCase() + type.slice(1)}
      </AlertTitle>
      <AlertDescription className={cn(config.descriptionClassName)}>{children}</AlertDescription>
    </Alert>
  )
}

export default MDXAdmonition
