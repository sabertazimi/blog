import Link from '@components/Link';
import LocalImage from '@components/LocalImage';
import Menu from '@components/Menu';
import PostsSearchBar from '@components/PostsSearchBar';
import ThemeSwitch from '@components/ThemeSwitch';
import { cx } from '@components/utils';
import { routes } from '@config';
import logo from '@images/logo-full.png';
import type { PostMeta } from '@types';
import styles from './DesktopNav.module.css';

interface Props {
  fixed: boolean;
  posts: PostMeta[];
}

const DesktopNav = ({ fixed, posts }: Props): JSX.Element => (
  <Menu
    mode="horizontal"
    className={cx(
      'fixed top-0 z-10 hidden w-full transform-gpu',
      'border-transparent bg-transparent font-extrabold backdrop-blur-md transition',
      'md:visible md:flex md:justify-center',
      {
        'bg-gradient-primary': !fixed,
        'shadow-none': !fixed,
        'bg-white/30': fixed,
        'shadow-lg': fixed,
      }
    )}
    items={[
      {
        key: 'home',
        label: (
          <Link href="/" className="flex-container transform-gpu transition">
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
              'flex-container dark-menu-link h-full transform-gpu transition',
              {
                [styles.light]: !fixed,
                [styles.dark]: fixed,
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
          <span className="flex-container h-full transform-gpu border-transparent transition md:w-52 lg:w-60 xl:w-max">
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
