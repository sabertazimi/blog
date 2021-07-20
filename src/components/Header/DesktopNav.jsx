import React from 'react';
import { Link } from 'gatsby';
import { Menu } from 'antd';
import { Routes } from '@config';
import PostsSearchBar from '@components/PostsSearchBar';
import logo from 'images/logo-full.png';

const DesktopNav = ({ fixed }) => (
  <Menu
    className={
      fixed
        ? 'fixed z-100 w-full font-extrabold transition bg-white border-transparent hidden md:visible md:flex'
        : 'fixed z-100 w-full font-extrabold transition bg-gradient-primary border-transparent hidden md:visible md:flex'
    }
    mode="horizontal"
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
          className={
            fixed ? 'transition-none text-dark' : 'transition-none text-light'
          }
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
          ? 'flex-container border-transparent transition -translate-x-28 transform-gpu'
          : 'flex-container border-transparent transition translate-x-0 transform-gpu'
      }
    >
      <PostsSearchBar />
    </Menu.Item>
  </Menu>
);

export default DesktopNav;
