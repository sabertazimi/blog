import cx from 'classnames'
import type { BlockquoteHTMLAttributes } from 'react'
import styles from './Blockquote.module.css'

interface Props extends BlockquoteHTMLAttributes<HTMLElement> {}

function Blockquote({ children, className, ...props }: Props): JSX.Element {
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
