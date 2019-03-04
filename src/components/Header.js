import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Menu,
  Button,
  Icon,
  Image,
  Visibility,
  Container,
  Segment
} from 'semantic-ui-react';

import AboutSidebar from './AboutSidebar.js';
import { PRIMARY_COLOR } from '../constants';

import headingPNG from '../heading.png';
import logoSVG from '../logo.svg';
import { Spring } from 'react-spring/renderprops';

const Header = ({
  headingHidden,
  menuFixed,
  sidebarVisible,
  onBottomPassed,
  onBottomPassedReverse,
  onToggle
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
              <Menu.Item>
                <Image
                  size="mini"
                  src={logoSVG}
                  style={{ marginRight: '3em' }}
                />
              </Menu.Item>
              <Menu.Item as={NavLink} exact to="/" activeClassName="active">
                Home
              </Menu.Item>
              <Menu.Item as={NavLink} to="/tags/all" activeClassName="active">
                Tags
              </Menu.Item>
              <Menu.Item as={NavLink} to="/book" activeClassName="active">
                Book
              </Menu.Item>
              <Menu.Item
                as={Button}
                animated="fade"
                position="right"
                inverted={!menuFixed}
                color={PRIMARY_COLOR}
                onClick={onToggle}
              >
                <Button.Content visible>About</Button.Content>
                <Button.Content hidden>
                  <Icon name="github" />
                </Button.Content>
              </Menu.Item>
            </Container>
          </Menu>
        )}
      </Spring>
      <Image
        src={headingPNG}
        fluid={!headingHidden && true}
        hidden={headingHidden || false}
      />
    </Segment>
    <AboutSidebar visible={sidebarVisible} />
  </Visibility>
);

export default Header;
