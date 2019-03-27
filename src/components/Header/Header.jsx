import React, { useState } from 'react';
import { Link } from 'gatsby';
import {
  Visibility,
  Segment,
  Container,
  Menu,
  Image,
  Input,
} from 'semantic-ui-react';
import { PRIMARY_COLOR } from '../../constants';
import logo from '../../images/logo-full.png';

const Header = () => {
  const [menuFixed, setMenuFixed] = useState(false);
  const [direction, setDirection] = useState('down');

  const hideFixedMenu = () => setMenuFixed(false);
  const showFixedMenu = () => setMenuFixed(true);
  const setScrollDirection = (e, { calculations }) => setDirection(calculations.direction);

  return (
    <Visibility
      onBottomPassed={showFixedMenu}
      onBottomPassedReverse={hideFixedMenu}
      onUpdate={setScrollDirection}
      once={false}
    >
      <Segment style={{ padding: 0 }} textAlign="center" vertical>
        <Menu
          color={PRIMARY_COLOR}
          className="blog-header"
          style={{ zIndex: 99999, transition: 'all 0.2s ease-in-out' }}
          fixed={(menuFixed && direction === 'up') ? 'top' : null}
          inverted={menuFixed}
          secondary
          stackable
          size="massive"
        >
          <Container style={{ maxWidth: '960px' }}>
            <Menu.Item style={{ paddingTop: 0, paddingBottom: 0 }}>
              <Image
                as={Link}
                to="/"
                src={logo}
                alt="logo"
                size="tiny"
                centered
              />
            </Menu.Item>
            <Menu.Item as={Link} to="/posts" activeClassName="active">
              Posts
            </Menu.Item>
            <Menu.Item as={Link} to="/tags" activeClassName="active">
              Tags
            </Menu.Item>
            <Menu.Item as={Link} to="/books" activeClassName="active">
              Books
            </Menu.Item>
            <Menu.Item as={Link} to="/about" activeClassName="active">
              About
            </Menu.Item>
            <Menu.Item activeClassName="active" position="right">
              <Input
                transparent
                inverted={menuFixed}
                action={{ color: PRIMARY_COLOR, icon: 'search' }}
                placeholder="Search..."
              />
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
    </Visibility>
  );
};

export default Header;
