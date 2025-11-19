import type { BuildTime, PostMeta } from '@/types'
import * as React from 'react'

interface Props {
  banner: string
  posts: PostMeta[]
  buildTime: BuildTime
  children: React.ReactNode
}

function Layout({ banner, posts, buildTime, children }: Props) {
  return (
    <div className="dark:bg-black">
      <header>{banner}</header>
      <main>{posts.toString()}</main>
      <section>{children}</section>
      <footer>{buildTime.toString()}</footer>
    </div>
  )
}

export default Layout
