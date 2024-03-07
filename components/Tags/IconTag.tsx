import { cx } from '@components/utils'
import type { ReactNode } from 'react'
import styles from './IconTag.module.css'
import Tag from './Tag'

interface Props {
  tag: string
  icon: ReactNode
}

const IconTag = ({ tag, icon }: Props): JSX.Element => (
  <Tag
    className={cx(
      styles.icon,
      'dark:border-light dark:bg-light dark:text-dark'
    )}
  >
    {icon}
    <span>{tag}</span>
  </Tag>
)

export default IconTag
