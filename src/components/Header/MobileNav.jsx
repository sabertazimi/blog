import React from 'react';
import { Link } from 'gatsby';
import { Row, Col, Popover, Menu } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import { Image } from 'semantic-ui-react';
import { Colors, Routes } from '@config';
import logo from 'images/logo-full.png';

const MobileNav = () => (
  <Row type="flex" justify="space-around" align="middle">
    <Col span={12} offset={6}>
      <Image as={Link} to="/" src={logo} alt="logo" size="tiny" />
    </Col>
    <Col span={6}>
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
