import type { PostMeta } from '@types';
import DesktopPostsGrid from './DesktopPostsGrid';
import MobilePostsGrid from './MobilePostsGrid';

interface Props {
  posts: PostMeta[];
}

const PostsGrid = ({ posts }: Props): JSX.Element => (
  <>
    <MobilePostsGrid posts={posts} />
    <DesktopPostsGrid posts={posts} />
  </>
);

export default PostsGrid;
