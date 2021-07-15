import React from 'react';
import { Link } from 'gatsby';
import { Menu, Avatar, Image } from 'antd';
import { Colors, Routes } from '@config';
import PostsSearchBar from '@components/PostsSearchBar';
import logo from 'images/logo-full.png';

const DesktopNav = ({ fixed }) => (
  <Menu
    className={fixed ? 'transition bg-white' : 'transition bg-gradient-primary'}
    mode="horizontal"
    style={{
      position: 'fixed',
      zIndex: 9999,
      width: '100%',
      borderBottomColor: Colors.transparent,
      fontWeight: 800,
    }}
  >
    <Menu.Item
      key="home"
      className={
        fixed
          ? 'transition scale-0 transform-gpu'
          : 'transition scale-100 transform-gpu '
      }
    >
      <Link to="/">
        <Image
          src={logo}
          alt="Logo"
          preview={false}
          width="6rem"
          height="6rem"
        />
      </Link>
    </Menu.Item>
    {Routes.map((route) => (
      <Menu.Item
        key={route.id}
        className={
          fixed
            ? 'transition -translate-x-28 transform-gpu'
            : 'transition translate-x-0 transform-gpu '
        }
      >
        <Link
          className="transition-none"
          style={{ color: fixed ? Colors.dark : Colors.light }}
          to={route.path}
        >
          {route.name}
        </Link>
      </Menu.Item>
    ))}
    <Menu.Item
      key="search"
      className={
        fixed
          ? 'transition -translate-x-28 transform-gpu'
          : 'transition translate-x-0 transform-gpu '
      }
      style={{ borderBottomColor: Colors.transparent }}
    >
      <PostsSearchBar />
    </Menu.Item>
  </Menu>
);

export default DesktopNav;
