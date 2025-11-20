import type { BuildTime, PostMeta } from '@/types'
import * as React from 'react'
import SiteFooter from '@/components/site-footer'
import SiteHeader from '@/components/site-header'

interface Props {
  posts: PostMeta[]
  buildTime: BuildTime
  children: React.ReactNode
}

function Layout({ posts, buildTime, children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader posts={posts} />
      {children}
      <SiteFooter buildTime={buildTime} />
    </div>
  )
}

export default Layout
