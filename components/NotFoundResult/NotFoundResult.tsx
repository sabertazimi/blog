import Link from '@components/Link'
import Result from '@components/Result'

interface Props {
  title?: string
}

function NotFoundResult({
  title = 'Sorry, the page you visited does not exist.',
}: Props): JSX.Element {
  return (
    <Result
      status="404"
      title="404"
      subTitle={title}
      extra={(
        <Link
          href="/posts"
          className="bg-gradient-primary m-auto mt-12 block max-w-fit rounded-full px-6 py-3 text-2xl font-extrabold text-light"
        >
          Back Home
        </Link>
      )}
    />
  )
}

export default NotFoundResult
