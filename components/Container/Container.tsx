import cx from 'classnames'
import type { CSSProperties, HTMLProps, ReactNode } from 'react'

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

function Container({ children, className, ...props }: Props): JSX.Element {
  return (
    <div
      className={cx(
        'p-auto container relative mx-auto my-0 block h-full',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
