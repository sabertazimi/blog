import PostCard from './PostCard'
import FlexContainer from '@/components/FlexContainer'
import type { PostMeta } from '@/types'

interface Props {
  posts: PostMeta[]
}

function MobilePostsGrid({ posts }: Props): JSX.Element {
  return (
    <FlexContainer className="flex-col items-start xl:hidden">
      {posts.map((post) => {
        return <PostCard key={post.slug} post={post} />
      })}
    </FlexContainer>
  )
}

export default MobilePostsGrid
