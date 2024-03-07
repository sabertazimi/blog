import { cx } from '@components/utils'
import { HTMLProps } from 'react'
import styles from './Table.module.css'

interface Props extends HTMLProps<HTMLTableElement> {}

const Table = ({ children, className, ...props }: Props): JSX.Element => (
  <table
    {...props}
    className={cx(
      className,
      styles.table,
      'dark:shadow-xl dark:shadow-primary'
    )}
  >
    {children}
  </table>
)

export default Table
