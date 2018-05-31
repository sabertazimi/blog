import React, { Component } from 'react';
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

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuFixed: false,
      sidebarVisible: false
    }
  }

  hideFixedMenu = () => this.setState({ menuFixed: false })
  showFixedMenu = () => this.setState({ menuFixed: true })

  toggleSidebar = () => {
    this.setState( { sidebarVisible: !this.state.sidebarVisible });
  }

  render() {
    const { headingHidden } = this.props;
    let { menuFixed } = this.state;

    menuFixed = menuFixed && !headingHidden;

    return (
      <Visibility
        onBottomPassed={this.showFixedMenu}
        onBottomPassedReverse={this.hideFixedMenu}
        once={false}
        >
        <Segment inverted textAlign='center' vertical>
          <Menu
            className='blog-header'
            style={{ zIndex: 99999 }}
            fixed={ menuFixed ? 'top' : null }
            inverted={ !menuFixed }
            pointing={ !menuFixed }
            secondary={ !menuFixed }
            size='large'
            >
            <Container text>
              <Menu.Item>
                <Image
                  size='mini'
                  src={logoSVG}
                  style={{ marginRight: '3em' }}
                  />
              </Menu.Item>
              <Menu.Item
                as={NavLink}
                exact
                to='/'
                activeClassName='active'
                >
                Home
              </Menu.Item>
              <Menu.Item
                as={NavLink}
                to='/tags/all'
                activeClassName='active'
                >
                Tags
              </Menu.Item>
              <Menu.Item
                as={Button}
                animated='fade'
                position='right'
                inverted={ !menuFixed }
                color={ PRIMARY_COLOR }
                onClick={ this.toggleSidebar}
                >
                <Button.Content
                  visible
                  >
                  About
                </Button.Content>
                <Button.Content hidden>
                  <Icon name='github'/>
                </Button.Content>
              </Menu.Item>
            </Container>
          </Menu>
          <Image src={ headingPNG } fluid={ !headingHidden && true }  hidden={ headingHidden || false }/>
        </Segment>
        <AboutSidebar visible={this.state.sidebarVisible}/>
      </Visibility>
    );
  }
}

export default Header;
