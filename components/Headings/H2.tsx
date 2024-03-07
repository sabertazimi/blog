import { cx } from '@components/utils'
import type { ReactNode } from 'react'
import Heading from './Heading'
import styles from './Headings.module.css'

interface Props {
  className?: string
  children?: ReactNode
}

const H2 = ({ className, ...props }: Props): JSX.Element => (
  <Heading {...props} level={2} className={cx(className, styles.h2)} />
)

export default H2
