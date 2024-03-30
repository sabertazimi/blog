import { cx } from '@components/utils'
import type { CSSProperties, HTMLProps, ReactNode } from 'react'

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

function FlexContainer({
  children,
  className,
  ...props
}: Props): JSX.Element {
  return (
    <div
      className={cx(
        'flex-container p-auto container relative mx-auto my-0 h-full',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default FlexContainer
