import FlexContainer from '@components/FlexContainer'
import { ArrowLeft, ArrowRight, Home } from '@components/Icons'
import Link from '@components/Link'
import { Bounce } from '@components/Motion'
import type { PostMeta } from '@types'

interface Props {
  prevPost: PostMeta['prevPost']
  nextPost: PostMeta['nextPost']
}

const ArticleNav = ({ prevPost, nextPost }: Props): JSX.Element => (
  <FlexContainer role="navigation" aria-label="footer-navigation">
    <Bounce className="mr-6 flex-1 md:mr-24">
      <Link
        href={prevPost ? `/post/${prevPost.slug}` : '/posts'}
        className="flex-container bg-gradient-primary w-full rounded-full py-8 text-4xl text-light"
      >
        {prevPost ? (
          <ArrowLeft aria-label="Prev" />
        ) : (
          <Home aria-label="Home" />
        )}
      </Link>
    </Bounce>
    <Bounce className="ml-6 flex-1 md:ml-24">
      <Link
        href={nextPost ? `/post/${nextPost.slug}` : '/posts'}
        className="flex-container bg-gradient-primary w-full rounded-full py-8 text-4xl text-light"
      >
        {nextPost ? (
          <ArrowRight aria-label="Next" />
        ) : (
          <Home aria-label="Home" />
        )}
      </Link>
    </Bounce>
  </FlexContainer>
)

export default ArticleNav
