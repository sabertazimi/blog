import type { PostMeta } from '@/types'
import FlexContainer from '@/components/FlexContainer'
import PostCard from './PostCard'

interface Props {
  posts: PostMeta[]
}

function DesktopPostsGrid({ posts }: Props) {
  const leftPosts = posts.slice(0, Math.ceil(posts.length / 2))
  const rightPosts = posts.slice(Math.ceil(posts.length / 2))

  return (
    <FlexContainer className="hidden items-start xl:visible xl:flex">
      <FlexContainer className="max-w-7/12 flex-col">
        {leftPosts.map((post) => {
          return <PostCard key={post.slug} post={post} />
        })}
      </FlexContainer>
      <FlexContainer className="max-w-4/12 flex-col">
        {rightPosts.map((post) => {
          return <PostCard key={post.slug} post={post} />
        })}
      </FlexContainer>
    </FlexContainer>
  )
}

export default DesktopPostsGrid
