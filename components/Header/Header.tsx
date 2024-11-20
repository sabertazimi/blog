'use client'

import type { PostMeta } from '@/types'
import { useVisibility } from '@/hooks'
import { useCallback, useRef, useState } from 'react'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

interface Props {
  posts: PostMeta[]
}

function Header({ posts }: Props): JSX.Element {
  const [navFixed, setNavFixed] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  const hideFixedNav = useCallback(() => {
    setNavFixed(false)
  }, [])

  const showFixedNav = useCallback(() => {
    setNavFixed(true)
  }, [])

  useVisibility({
    ref: headerRef,
    onBottomPassed: showFixedNav,
    onBottomPassedReverse: hideFixedNav,
  })

  return (
    <div role="grid" ref={headerRef}>
      <MobileNav />
      <DesktopNav fixed={navFixed} posts={posts} />
    </div>
  )
}

export default Header
