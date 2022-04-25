import { Layout } from '@layouts';
import type { PostMeta } from '@types';

interface Props {
  posts: PostMeta[];
  buildTime: string | number | Date;
}

const NotFound = ({ posts, buildTime }: Props): JSX.Element => (
  <div>
    <Layout banner="Exploring" posts={posts} buildTime={buildTime}>
      <div className="text-center">
        <h1>Sorry, the page you visited does not exist.</h1>
      </div>
    </Layout>
  </div>
);

export default NotFound;
