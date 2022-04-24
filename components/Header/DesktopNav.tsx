import { PostsSearchBar } from '@components';
import { Routes } from '@config';
import logo from '@images/logo-full.png';
import type { PostMetaType } from '@types';
import { Menu } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  fixed: boolean;
  posts: PostMetaType[];
}

const DesktopNav = ({ fixed, posts }: Props): JSX.Element => (
  <Menu
    mode="horizontal"
    className={classNames(
      'fixed top-0 z-100 w-full font-extrabold bg-transparent border-transparent',
      'transition transform-gpu hidden md:visible md:flex',
      {
        'bg-gradient-primary': !fixed,
        'bg-white/30': fixed,
        'shadow-lg': fixed,
        'backdrop-blur-primary': fixed,
      }
    )}
  >
    <Link href="/" key="home">
      <a
        className={classNames('flex-container ml-6 mr-auto transition transform-gpu', {
          'scale-100': !fixed,
          'scale-0': fixed,
        })}
      >
        <Image src={logo} alt="Logo" width={96} height={96} />
      </a>
    </Link>
    {Routes.map(route => (
      <Menu.Item
        key={route.id}
        className={classNames('flex-container transition transform-gpu', {
          'translate-x-0': !fixed,
          '-translate-x-28': fixed,
        })}
      >
        <Link href={route.path}>
          <a
            className={classNames('transition-none', {
              'text-light': !fixed,
              'text-dark': fixed,
            })}
          >
            {route.name}
          </a>
        </Link>
      </Menu.Item>
    ))}
    <Menu.Item
      key="search"
      className={classNames(
        'flex-container ml-auto mr-64 border-transparent transition transform-gpu',
        {
          'translate-x-0': !fixed,
          '-translate-x-28': fixed,
        }
      )}
    >
      <PostsSearchBar posts={posts} />
    </Menu.Item>
  </Menu>
);

export default DesktopNav;
