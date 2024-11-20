'use client'

import { siteConfig } from '@/config'
import { useDisqus } from '@/hooks'
import cx from 'classnames'
import styles from './ArticleComments.module.css'

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
