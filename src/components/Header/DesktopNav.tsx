import { PostsSearchBar } from '@components';
import { Routes } from '@config';
import { PostMetaType } from '@types';
import { Menu } from 'antd';
import classNames from 'classnames';
import { Link } from 'gatsby';
import logo from 'images/logo-full.png';
import React from 'react';

interface Props {
  fixed: boolean;
  posts: PostMetaType[];
}

const DesktopNav = ({ fixed, posts }: Props): JSX.Element => (
  <Menu
    className={classNames(
      'fixed z-100 w-full font-extrabold transition transform-gpu border-transparent hidden md:visible md:flex',
      { 'bg-white': fixed, 'bg-gradient-primary': !fixed }
    )}
    mode="horizontal"
  >
    <Menu.Item
      key="home"
      className={classNames('flex-container transition transform-gpu', {
        'scale-0': fixed,
        'scale-100': !fixed,
      })}
    >
      <Link to="/">
        <img className="block w-full h-24" src={logo as string} alt="Logo" />
      </Link>
    </Menu.Item>
    {Routes.map((route) => (
      <Menu.Item
        key={route.id}
        className={classNames('flex-container transition transform-gpu', {
          '-translate-x-28': fixed,
          'translate-x-0': !fixed,
        })}
      >
        <Link
          className={classNames('transition-none', {
            'text-dark': fixed,
            'text-light': !fixed,
          })}
          to={route.path}
        >
          {route.name}
        </Link>
      </Menu.Item>
    ))}
    <Menu.Item
      key="search"
      className={classNames(
        'flex-container border-transparent transition transform-gpu',
        {
          '-translate-x-28': fixed,
          'translate-x-0': !fixed,
        }
      )}
    >
      <PostsSearchBar posts={posts} />
    </Menu.Item>
  </Menu>
);

export default DesktopNav;
