import Link from '@components/Link';
import LocalImage from '@components/LocalImage';
import Menu from '@components/Menu';
import PostsSearchBar from '@components/PostsSearchBar';
import ThemeSwitch from '@components/ThemeSwitch';
import { cx } from '@components/utils';
import { routes } from '@config';
import logo from '@images/logo-full.png';
import type { PostMeta } from '@types';

interface Props {
  fixed: boolean;
  posts: PostMeta[];
}

const DesktopNav = ({ fixed, posts }: Props): JSX.Element => (
  <Menu
    mode="horizontal"
    className={cx(
      'fixed top-0 z-10 w-full',
      'hidden md:visible md:flex',
      'transition transform-gpu',
      'bg-transparent border-transparent font-extrabold',
      {
        'backdrop-blur-none': !fixed,
        'bg-gradient-primary': !fixed,
        'shadow-none': !fixed,
        'backdrop-blur-sm': fixed,
        'bg-white/30': fixed,
        'shadow-lg': fixed,
      }
    )}
    items={[
      {
        key: 'home',
        label: (
          <Link href="/" className="flex-container transition transform-gpu">
            <LocalImage src={logo} alt="Logo" width={96} height={96} />
          </Link>
        ),
      },
      ...routes.map(route => ({
        key: route.id,
        label: (
          <Link
            href={route.path}
            className={cx(
              'flex-container h-full',
              'transition transform-gpu transition-none',
              'dark:text-light',
              {
                'text-light': !fixed,
                'text-dark': fixed,
              }
            )}
          >
            {route.name}
          </Link>
        ),
      })),
      {
        key: 'search',
        label: (
          <span className="flex-container h-full border-transparent transition transform-gpu">
            <PostsSearchBar posts={posts} />
          </span>
        ),
      },
      {
        key: 'theme',
        label: (
          <ThemeSwitch
            className={cx('dark:text-light', {
              'text-light': !fixed,
              'text-dark': fixed,
            })}
          />
        ),
      },
    ]}
  />
);

export default DesktopNav;
