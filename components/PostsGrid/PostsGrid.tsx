import type { PostMeta } from '@types'
import DesktopPostsGrid from './DesktopPostsGrid'
import MobilePostsGrid from './MobilePostsGrid'

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
