import cx from 'classnames'
import type { ReactNode } from 'react'
import Heading from './Heading'
import styles from './Headings.module.css'

interface Props {
  className?: string
  children?: ReactNode
}

function H1({ className, ...props }: Props): JSX.Element {
  return <Heading {...props} level={1} className={cx(className, styles.h1)} />
}

export default H1
