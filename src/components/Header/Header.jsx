import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Row, Col, Menu, Popover } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import { Visibility, Segment, Image } from 'semantic-ui-react';
import PostsSearchBar from 'components/PostsSearchBar';
import { useResponsive } from 'hooks';
import { BreakPoints, Colors } from 'config';
import * as styles from './Header.module.css';
import logo from 'images/logo-full.png';

const Header = ({ posts }) => {
  const [menuFixed, setMenuFixed] = useState(false);
  const isNotMobile = useResponsive({ minWidth: BreakPoints.mobile });

  const hideFixedMenu = () => setMenuFixed(false);
  const showFixedMenu = () => setMenuFixed(true);

  const renderMobileMenu = () => (
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
              <Menu.Item>
                <Link to="/posts">Posts</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/tags">Tags</Link>
              </Menu.Item>
              <Menu.Item as={Link} to="/books">
                <Link to="/books">Books</Link>
              </Menu.Item>
              <Menu.Item as={Link} to="/about">
                <Link to="/about">About</Link>
              </Menu.Item>
            </Menu>
          }
          trigger="click"
        >
          <BarsOutlined style={{ fontSize: '2em', color: Colors.primary }} />
        </Popover>
      </Col>
    </Row>
  );

  const renderDesktopMenu = () => (
    <Menu
      className={styles.headerMenu}
      mode="horizontal"
      style={{
        position: 'fixed',
        zIndex: 9999,
        width: '100%',
        borderBottomColor: Colors.transparent,
        transition: 'transform 0.2s ease-in-out, background 0.5s ease-in-out',
        transform: menuFixed ? 'scale(1)' : 'scale(1.1)',
        background: menuFixed
          ? Colors.white
          : 'linear-gradient(120deg,#2b488a,#ca3749)',
        color: menuFixed ? Colors.dark : Colors.light,
        fontWeight: 800,
        lineHeight: '64px',
      }}
    >
      <Menu.Item>
        <Image as={Link} to="/" src={logo} alt="logo" size="tiny" centered />
      </Menu.Item>
      <Menu.Item>
        <Link to="/posts">Posts</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/tags">Tags</Link>
      </Menu.Item>
      <Menu.Item as={Link} to="/books">
        <Link to="/books">Books</Link>
      </Menu.Item>
      <Menu.Item as={Link} to="/about">
        <Link to="/about">About</Link>
      </Menu.Item>
      {posts && (
        <Menu.Item style={{ borderBottomColor: Colors.transparent }}>
          <PostsSearchBar posts={posts} />
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Visibility
      onBottomPassed={showFixedMenu}
      onBottomPassedReverse={hideFixedMenu}
      once={false}
    >
      <Segment style={{ padding: 0 }} textAlign="center" vertical>
        {isNotMobile ? renderDesktopMenu() : renderMobileMenu()}
      </Segment>
    </Visibility>
  );
};

export default Header;
