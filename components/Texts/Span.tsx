import type { ReactNode } from 'react'
import cx from 'classnames'

interface SpanProps {
  children: ReactNode
  size?: 'md' | 'lg' | 'xl'
  className?: string
}

function Span({
  children,
  size = 'md',
  className = '',
}: SpanProps) {
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
