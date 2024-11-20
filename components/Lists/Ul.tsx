import type { DetailedHTMLProps, OlHTMLAttributes } from 'react'
import cx from 'classnames'
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
