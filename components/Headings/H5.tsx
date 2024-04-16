import cx from 'classnames'
import type { ReactNode } from 'react'
import Heading from './Heading'
import styles from './Headings.module.css'

interface Props {
  className?: string
  children?: ReactNode
}

function H5({ className, ...props }: Props): JSX.Element {
  return <Heading {...props} level={5} className={cx(className, styles.h5)} />
}

export default H5
