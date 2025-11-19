import type { ReactNode } from 'react'
import cx from 'classnames'
import Heading from './Heading'
import styles from './Headings.module.css'

interface Props {
  className?: string
  children?: ReactNode
}

function H3({ className, ...props }: Props) {
  return <Heading {...props} level={3} className={cx(className, styles.h3)} />
}

export default H3
