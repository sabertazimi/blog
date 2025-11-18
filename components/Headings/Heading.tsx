'use client'

import type { TitleProps } from 'antd/lib/typography/Title'
import { Typography } from 'antd'
import cx from 'classnames'
import styles from './Headings.module.css'

// Keep `H3` `margin-top`.
function Heading({
  children,
  className,
  ...props
}: TitleProps) {
  return (
    <Typography.Title
      {...props}
      className={cx('mdx-heading', styles.heading, className)}
    >
      {children}
    </Typography.Title>
  )
}

export default Heading
