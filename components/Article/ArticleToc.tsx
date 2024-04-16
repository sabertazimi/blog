'use client'

import { useEffect, useState } from 'react'
import styles from './ArticleToc.module.css'
import Anchor from '@/components/Anchor'

interface Props {
  slug: string
  offset?: number
}

interface TocItem {
  key: string | number
  href: string
  title: string
}

function ArticleToc({ slug, offset = 150 }: Props): JSX.Element {
  const [tocItems, setTocItems] = useState<TocItem[]>([])

  useEffect(() => {
    const items = document.querySelectorAll('h2.ant-typography')
    const tocItems = Array.from(items).map(item => ({
      key: `#${item.id}`,
      href: `#${item.id}`,
      title: item.textContent,
    })) as TocItem[]
    setTocItems(tocItems)
  }, [slug])

  return (
    <div className={styles.toc}>
      <Anchor offsetTop={offset} items={tocItems} />
    </div>
  )
}

export default ArticleToc
