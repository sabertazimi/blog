import cx from 'classnames'
import type { DetailedHTMLProps, OlHTMLAttributes } from 'react'
import styles from './Ol.module.css'

interface Props
  extends DetailedHTMLProps<
    OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  > {}

function Ol({ children, className, ...props }: Props): JSX.Element {
  return (
    <ol {...props} className={cx(className, styles.ol)}>
      {children}
    </ol>
  )
}

export default Ol
