import type { ReactNode } from 'react'
import cx from 'classnames'
import Heading from './Heading'
import styles from './Headings.module.css'

interface Props {
  className?: string
  children?: ReactNode
}

function H6({ className, ...props }: Props) {
  return <Heading {...props} level={5} className={cx(className, styles.h6)} />
}

export default H6
