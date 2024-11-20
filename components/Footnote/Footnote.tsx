import type { ReactNode } from 'react'
import cx from 'classnames'
import styles from './Footnote.module.css'

interface Props {
  children?: ReactNode
  className?: string
}

function Footnote({ children, className, ...props }: Props): JSX.Element {
  return (
    <div {...props} className={cx(className, styles.footnote)}>
      {children}
    </div>
  )
}

export default Footnote
