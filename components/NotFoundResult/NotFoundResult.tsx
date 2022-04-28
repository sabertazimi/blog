import Link from '@components/Link';
import { classNames } from '@components/utils';
import { Result } from 'antd';

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
        className={classNames(
          'block m-auto mt-12 py-3 px-6 max-w-fit',
          'rounded-full',
          'font-extrabold text-2xl',
          'text-light bg-gradient-primary'
        )}
      >
        Back Home
      </Link>
    }
  />
);

export default NotFoundResult;
