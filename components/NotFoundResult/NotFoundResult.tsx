import Link from '@components/Link';
import Result from '@components/Result';

interface Props {
  title?: string;
}

const NotFoundResult = ({
  title = 'Sorry, the page you visited does not exist.',
}: Props): JSX.Element => (
  <Result
    status="404"
    title="404"
    subTitle={title}
    extra={
      <Link
        href="/posts"
        className="bg-gradient-primary m-auto mt-12 block max-w-fit rounded-full py-3 px-6 text-2xl font-extrabold text-light"
      >
        Back Home
      </Link>
    }
  />
);

export default NotFoundResult;
