import { cx } from '@components/utils'
import type { CSSProperties, HTMLProps, ReactNode } from 'react'

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

const Container = ({ children, className, ...props }: Props): JSX.Element => (
  <div
    className={cx(
      'p-auto container relative mx-auto my-0 block h-full',
      className
    )}
    {...props}
  >
    {children}
  </div>
)

export default Container
