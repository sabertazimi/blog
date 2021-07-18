import React from 'react';
import { Link } from 'gatsby';
import { Menu } from 'antd';
import { Colors, Routes } from '@config';
import PostsSearchBar from '@components/PostsSearchBar';
import logo from 'images/logo-full.png';

const DesktopNav = ({ className, fixed }) => (
  <Menu
    className={
      fixed
        ? `transition bg-white ${className}`
        : `transition bg-gradient-primary ${className}`
    }
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
          ? 'flex-container transition scale-0 transform-gpu'
          : 'flex-container transition scale-100 transform-gpu '
      }
    >
      <Link to="/">
        <img className="block w-full h-24" src={logo} alt="Logo" />
      </Link>
    </Menu.Item>
    {Routes.map((route) => (
      <Menu.Item
        key={route.id}
        className={
          fixed
            ? 'flex-container transition -translate-x-28 transform-gpu'
            : 'flex-container transition translate-x-0 transform-gpu '
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
          ? 'flex-container transition -translate-x-28 transform-gpu'
          : 'flex-container transition translate-x-0 transform-gpu '
      }
      style={{ borderBottomColor: Colors.transparent }}
    >
      <PostsSearchBar />
    </Menu.Item>
  </Menu>
);

export default DesktopNav;
