import type { ReactNode } from 'react'
import cx from 'classnames'
import styles from './IconTag.module.css'
import Tag from './Tag'

interface Props {
  tag: string
  icon: ReactNode
}

function IconTag({ tag, icon }: Props) {
  return (
    <Tag
      className={cx(
        styles.icon,
        'dark:border-light dark:bg-light dark:text-dark',
      )}
    >
      {icon}
      <span>{tag}</span>
    </Tag>
  )
}

export default IconTag
