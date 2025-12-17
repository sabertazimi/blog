import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PostSectionProps {
  children: ReactNode
  className?: string
}

export function PostSection({ children, className }: PostSectionProps) {
  return (
    <div className={cn('border-border border-t p-6 lg:p-10', className)}>
      {children}
    </div>
  )
}
