import React from 'react';
import { Link } from 'gatsby';
import { Menu } from 'antd';
import { Image } from 'semantic-ui-react';
import { Colors, Routes } from '@config';
import PostsSearchBar from '@components/PostsSearchBar';
import logo from 'images/logo-full.png';

const DesktopNav = ({ fixed }) => (
  <Menu
    className={fixed ? 'bg-white' : 'bg-gradient-primary'}
    mode="horizontal"
    style={{
      position: 'fixed',
      zIndex: 9999,
      width: '100%',
      borderBottomColor: Colors.transparent,
      transition: 'transform 0.2s ease-in-out, background 0.5s ease-in-out',
      transform: fixed ? 'scale(1)' : 'scale(1.1)',
      fontWeight: 800,
      lineHeight: '64px',
    }}
  >
    <Menu.Item key="home">
      <Image as={Link} to="/" src={logo} alt="logo" size="tiny" centered />
    </Menu.Item>
    {Routes.map((route) => (
      <Menu.Item key={route.id}>
        <Link
          className="transition-none"
          style={{ color: fixed ? Colors.dark : Colors.light }}
          to={route.path}
        >
          {route.name}
        </Link>
      </Menu.Item>
    ))}
    <Menu.Item key="search" style={{ borderBottomColor: Colors.transparent }}>
      <PostsSearchBar />
    </Menu.Item>
  </Menu>
);

export default DesktopNav;
