import type { ReactNode } from 'react'
import cx from 'classnames'
import Heading from './Heading'
import styles from './Headings.module.css'

interface Props {
  className?: string
  children?: ReactNode
}

function H2({ className, ...props }: Props): JSX.Element {
  return <Heading {...props} level={2} className={cx(className, styles.h2)} />
}

export default H2
