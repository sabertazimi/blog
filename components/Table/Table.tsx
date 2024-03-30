import { cx } from '@components/utils'
import type { HTMLProps } from 'react'
import styles from './Table.module.css'

interface Props extends HTMLProps<HTMLTableElement> {}

function Table({ children, className, ...props }: Props): JSX.Element {
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
