import React, { useState } from 'react';
import { Spring } from 'react-spring/renderprops';
import { Link } from 'gatsby';
import { Menu, Visibility, Container, Segment } from 'semantic-ui-react';

const Header = () => {
  const [menuFixed, setMenuFixed] = useState(false);
  const hideFixedMenu = () => setMenuFixed(false);
  const showFixedMenu = () => setMenuFixed(true);

  return (
    <Visibility
      onBottomPassed={showFixedMenu}
      onBottomPassedReverse={hideFixedMenu}
      once={false}
    >
      <Segment style={{ paddingBottom: 0 }} textAlign="center" vertical>
        <Menu
          className="blog-header"
          style={{ zIndex: 99999 }}
          fixed={menuFixed ? 'top' : null}
          pointing
          secondary
          size="large"
        >
          <Spring
            from={{ opacity: 0, transform: 'translateX(200px)' }}
            to={{ opacity: 1, transform: 'translateX(0)' }}
          >
            {props => (
              <Container text style={{ ...props }}>
                <Menu.Item as={Link} to="/" activeClassName="active">
                  Home
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
              </Container>
            )}
          </Spring>
        </Menu>
      </Segment>
    </Visibility>
  );
};

export default Header;
