import type { ReactNode } from 'react'
import { Typography } from 'antd'
import cx from 'classnames'
import styles from './Anchor.module.css'

interface Props {
  children?: ReactNode
  className?: string
}

function Anchor({ className, ...props }: Props): JSX.Element {
  return (
    <Typography.Link
      {...props}
      className={cx('mdx-hash-link', className, styles.anchor)}
    />
  )
}

export default Anchor
