import type { HTMLProps } from 'react'
import cx from 'classnames'
import styles from './Table.module.css'

interface Props extends HTMLProps<HTMLTableElement> {}

function Table({ children, className, ...props }: Props) {
  return (
    <table
      {...props}
      className={cx(
        className,
        styles.table,
        'dark:shadow-xl dark:shadow-primary',
      )}
    >
      {children}
    </table>
  )
}

export default Table
