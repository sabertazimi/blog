import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Menu,
  Visibility,
  Container,
  Segment
} from 'semantic-ui-react';

const Header = ({
  menuFixed,
  onBottomPassed,
  onBottomPassedReverse,
}) => (
  <Visibility
    onBottomPassed={onBottomPassed}
    onBottomPassedReverse={onBottomPassedReverse}
    once={false}
  >
    <Segment inverted textAlign="center" vertical>
      <Spring
        from={{ opacity: 0, transform: 'translateX(-300px)' }}
        to={{ opacity: 1, transform: 'translateX(0)' }}
      >
        {props => (
          <Menu
            className="blog-header"
            style={{ ...props, zIndex: 99999 }}
            fixed={menuFixed ? 'top' : null}
            inverted={!menuFixed}
            pointing={!menuFixed}
            secondary={!menuFixed}
            size="large"
          >
            <Container text>
              <Menu.Item as={NavLink} exact to="/" activeClassName="active">
                Home
              </Menu.Item>
              <Menu.Item as={NavLink} to="/about" activeClassName="active">
                About
              </Menu.Item>
            </Container>
          </Menu>
        )}
      </Spring>
      <Heading headingHidden={headingHidden} />
    </Segment>
  </Visibility>
);

export default Header;
