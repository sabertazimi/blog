import { BackTop, Container, Footer, Header } from '@components'
import type { BuildTime, PostMeta } from '@types'
import type { ReactNode } from 'react'

interface Props {
  posts: PostMeta[]
  buildTime: BuildTime
  children: ReactNode
}

function PostLayout({
  posts,
  buildTime,
  children,
}: Props): JSX.Element {
  return (
    <div className="dark:bg-black">
      <Header posts={posts} />
      <Container className="max-w-full">
        {children}
        <BackTop className="bottom-12 right-12 md:bottom-16 md:right-16" />
      </Container>
      <Footer buildTime={buildTime} />
    </div>
  )
}

export default PostLayout
