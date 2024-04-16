import DesktopPostsGrid from './DesktopPostsGrid'
import MobilePostsGrid from './MobilePostsGrid'
import type { PostMeta } from '@/types'

interface Props {
  posts: PostMeta[]
}

function PostsGrid({ posts }: Props): JSX.Element {
  return (
    <>
      <MobilePostsGrid posts={posts} />
      <DesktopPostsGrid posts={posts} />
    </>
  )
}

export default PostsGrid
