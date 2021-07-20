import React from 'react';
import { Link } from 'gatsby';
import { Row, Col, Menu, Popover } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import { Routes } from '@config';
import logo from 'images/logo-full.png';

const MobileNav = ({ className }) => (
  <Row type="flex" justify="center" align="middle" className={className}>
    <Col span={8} offset={8} className="flex-container">
      <Link to="/">
        <img className="block w-24 h-24" src={logo} alt="Logo" />
      </Link>
    </Col>
    <Col span={8} className="flex-container">
      <Popover
        placement="bottomRight"
        content={
          <Menu
            className="w-full max-w-md text-3xl font-extrabold text-center min-w-xs"
            mode="vertical"
          >
            {Routes.map((route) => (
              <Menu.Item key={route.id}>
                <Link to={route.path}>{route.name}</Link>
              </Menu.Item>
            ))}
          </Menu>
        }
        trigger="click"
      >
        <BarsOutlined className="text-5xl text-primary" />
      </Popover>
    </Col>
  </Row>
);

export default MobileNav;
