import FlexContainer from '@components/FlexContainer'
import type { PostMeta } from '@types'
import PostCard from './PostCard'

interface Props {
  posts: PostMeta[]
}

const DesktopPostsGrid = ({ posts }: Props): JSX.Element => {
  const leftPosts = posts.slice(0, Math.ceil(posts.length / 2))
  const rightPosts = posts.slice(Math.ceil(posts.length / 2))

  return (
    <FlexContainer className="hidden items-start xl:visible xl:flex">
      <FlexContainer className="max-w-7/12 flex-col">
        {leftPosts.map((post, index) => {
          return <PostCard key={index} post={post} />
        })}
      </FlexContainer>
      <FlexContainer className="max-w-4/12 flex-col">
        {rightPosts.map((post, index) => {
          return <PostCard key={index} post={post} />
        })}
      </FlexContainer>
    </FlexContainer>
  )
}

export default DesktopPostsGrid
