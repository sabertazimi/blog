import cx from 'classnames'
import type { DetailedHTMLProps, OlHTMLAttributes } from 'react'
import styles from './Ul.module.css'

interface Props
  extends DetailedHTMLProps<
    OlHTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {}

function Ul({ children, className, ...props }: Props): JSX.Element {
  return (
    <ul {...props} className={cx(className, styles.ul)}>
      {children}
    </ul>
  )
}

export default Ul
