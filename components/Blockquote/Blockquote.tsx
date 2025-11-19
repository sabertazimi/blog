import type { BlockquoteHTMLAttributes } from 'react'
import cx from 'classnames'
import styles from './Blockquote.module.css'

interface Props extends BlockquoteHTMLAttributes<HTMLElement> {}

function Blockquote({ children, className, ...props }: Props) {
  return (
    <blockquote
      {...props}
      className={cx(
        className,
        styles.blockquote,
        'dark:border dark:bg-black dark:shadow-xl dark:shadow-primary',
      )}
    >
      {children}
    </blockquote>
  )
}

export default Blockquote
