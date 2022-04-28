import FlexContainer from '@components/FlexContainer';
import { ArrowLeft, ArrowRight, Home } from '@components/Icons';
import Link from '@components/Link';
import { Bounce } from '@components/Motion';
import { classNames } from '@components/utils';
import type { PostMeta } from '@types';

interface Props {
  prevPost: PostMeta['prevPost'];
  nextPost: PostMeta['nextPost'];
}

const ArticleNav = ({ prevPost, nextPost }: Props): JSX.Element => (
  <FlexContainer
    className="justify-between"
    role="navigation"
    aria-label="footer-navigation"
  >
    <Bounce className="flex-1 mr-6 md:mr-24">
      <Link
        href={prevPost ? `/post/${prevPost.slug}` : '/posts'}
        className={classNames(
          'flex-container',
          'flex-1',
          'w-full h-24 m-auto',
          'rounded-full',
          'font-extrabold text-2xl',
          'text-light bg-gradient-primary'
        )}
      >
        {prevPost ? (
          <ArrowLeft aria-label="Prev" />
        ) : (
          <Home aria-label="Home" />
        )}
        <span className="ml-3 hidden md:visible md:inline">
          {prevPost ? prevPost.title : 'Back Home'}
        </span>
      </Link>
    </Bounce>
    <Bounce className="flex-1 ml-6 md:ml-24">
      <Link
        href={nextPost ? `/post/${nextPost.slug}` : '/posts'}
        className={classNames(
          'flex-container',
          'flex-1',
          'w-full h-24 m-auto',
          'rounded-full',
          'font-extrabold text-2xl',
          'text-light bg-gradient-primary'
        )}
      >
        <span className="mr-3 hidden md:visible md:inline">
          {nextPost ? nextPost.title : 'Back Home'}
        </span>
        {nextPost ? (
          <ArrowRight aria-label="Next" />
        ) : (
          <Home aria-label="Home" />
        )}
      </Link>
    </Bounce>
  </FlexContainer>
);

export default ArticleNav;
