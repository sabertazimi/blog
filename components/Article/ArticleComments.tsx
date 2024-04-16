'use client'

import cx from 'classnames'
import styles from './ArticleComments.module.css'
import { siteConfig } from '@/config'
import { useDisqus } from '@/hooks'

interface Props {
  url?: string
}

function ArticleComments({
  url = siteConfig.disqusUrl,
}: Props): JSX.Element {
  useDisqus(url)

  return (
    <div
      id="disqus_thread"
      className={cx(styles.disqus, 'after:bg-white dark:after:bg-black')}
    />
  )
}

export default ArticleComments
