import { cx } from '@components/utils'
import type { ReactNode } from 'react'

interface SpanProps {
  children: ReactNode
  size?: 'md' | 'lg' | 'xl'
  className?: string
}

function Span({
  children,
  size = 'md',
  className = '',
}: SpanProps): JSX.Element {
  if (size === 'xl') {
    return (
      <span
        className={cx(
          'ml-2 inline-block align-bottom text-5xl font-extrabold',
          className,
        )}
      >
        {children}
      </span>
    )
  }

  if (size === 'lg') {
    return (
      <span
        className={cx(
          'ml-2 inline-block align-bottom text-3xl font-extrabold',
          className,
        )}
      >
        {children}
      </span>
    )
  }

  return (
    <span className={cx('ml-2 inline-block align-bottom text-xl', className)}>
      {children}
    </span>
  )
}

export default Span
