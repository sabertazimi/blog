import React from 'react';
import { Link } from 'gatsby';
import { Row, Col, Menu, Popover } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import { Colors, Routes } from '@config';
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
            mode="vertical"
            style={{
              width: '100%',
              minWidth: '400px',
              textAlign: 'center',
              fontWeight: 800,
            }}
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
        <BarsOutlined style={{ fontSize: '2em', color: Colors.primary }} />
      </Popover>
    </Col>
  </Row>
);

export default MobileNav;
