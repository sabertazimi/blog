import { FlexContainer } from '@components';
import type { PostMeta } from '@types';
import PostCard from './PostCard';

interface Props {
  posts: PostMeta[];
}

const MobilePostsGrid = ({ posts }: Props): JSX.Element => (
  <FlexContainer className="flex-col items-start xl:hidden">
    {posts.map((post, index) => {
      return <PostCard key={index} post={post} />;
    })}
  </FlexContainer>
);

export default MobilePostsGrid;
