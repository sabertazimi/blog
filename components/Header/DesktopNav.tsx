import { PostsSearchBar } from '@components';
import { routes } from '@config';
import logo from '@images/logo-full.png';
import type { PostMeta } from '@types';
import { Menu } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  fixed: boolean;
  posts: PostMeta[];
}

const DesktopNav = ({ fixed, posts }: Props): JSX.Element => (
  <Menu
    mode="horizontal"
    className={classNames(
      'fixed top-0 z-100 w-full',
      'hidden md:visible md:flex',
      'font-extrabold bg-transparent border-transparent',
      'transition transform-gpu',
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
          <Link href="/">
            <a className="flex-container transition transform-gpu">
              <Image src={logo} alt="Logo" width={96} height={96} />
            </a>
          </Link>
        ),
      },
      ...routes.map(route => ({
        key: route.id,
        label: (
          <Link href={route.path}>
            <a
              className={classNames(
                'flex-container h-full transition transform-gpu transition-none',
                {
                  'text-light': !fixed,
                  'text-dark': fixed,
                }
              )}
            >
              {route.name}
            </a>
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
    ]}
  />
);

export default DesktopNav;
