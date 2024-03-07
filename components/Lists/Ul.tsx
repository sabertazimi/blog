import { cx } from '@components/utils'
import type { DetailedHTMLProps, OlHTMLAttributes } from 'react'
import styles from './Ul.module.css'

interface Props
  extends DetailedHTMLProps<
    OlHTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {}

const Ul = ({ children, className, ...props }: Props): JSX.Element => (
  <ul {...props} className={cx(className, styles.ul)}>
    {children}
  </ul>
)

export default Ul
