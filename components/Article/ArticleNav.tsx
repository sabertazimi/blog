import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { FlexContainer } from '@components';
import { Bounce } from '@components/Motion';
import type { PostMeta } from '@types';
import classNames from 'classnames';
import Link from 'next/link';

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
      <Link href={prevPost ? `/post/${prevPost.slug}` : '/posts'}>
        <a
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
            <ArrowLeftOutlined aria-label="Prev" />
          ) : (
            <HomeOutlined aria-label="Home" />
          )}
          <span className="ml-3 hidden md:visible md:inline">
            {prevPost ? prevPost.title : 'Back to Home'}
          </span>
        </a>
      </Link>
    </Bounce>
    <Bounce className="flex-1 ml-6 md:ml-24">
      <Link href={nextPost ? `/post/${nextPost.slug}` : '/posts'}>
        <a
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
            {nextPost ? nextPost.title : 'Back to Home'}
          </span>
          {nextPost ? (
            <ArrowRightOutlined aria-label="Next" />
          ) : (
            <HomeOutlined aria-label="Home" />
          )}
        </a>
      </Link>
    </Bounce>
  </FlexContainer>
);

export default ArticleNav;
