import type { BuildTime, PostMeta, Tag } from '@/types'
import * as React from 'react'
import SiteFooter from '@/components/site-footer'
import SiteHeader from '@/components/site-header'

interface Props {
  posts: PostMeta[]
  tags: Tag[]
  buildTime: BuildTime
  children: React.ReactNode
}

function Layout({ posts, tags, buildTime, children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader posts={posts} tags={tags} />
      <main className="bg-background relative flex flex-1 flex-col">{children}</main>
      <SiteFooter buildTime={buildTime} />
    </div>
  )
}

export default Layout
