import type { DetailedHTMLProps, OlHTMLAttributes } from 'react'
import cx from 'classnames'
import styles from './Ol.module.css'

interface Props
  extends DetailedHTMLProps<
    OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  > {}

function Ol({ children, className, ...props }: Props) {
  return (
    <ol {...props} className={cx(className, styles.ol)}>
      {children}
    </ol>
  )
}

export default Ol
