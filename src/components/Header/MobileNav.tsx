import React from 'react';
import { Link } from 'gatsby';
import { Row, Col, Menu, Popover } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import { Routes } from '@config';
import logo from 'images/logo-full.png';

const MobileNav = () => (
  <Row className="md:hidden" type="flex" justify="center" align="middle">
    <Col className="flex-container" span={8} offset={8}>
      <Link to="/">
        <img className="block w-24 h-24" src={logo} alt="Logo" />
      </Link>
    </Col>
    <Col className="flex-container" span={8}>
      <Popover
        placement="bottomRight"
        content={
          <Menu
            className="w-full max-w-md text-2xl font-extrabold text-center min-w-xs"
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
