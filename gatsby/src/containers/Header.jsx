import React, { Component } from 'react';

import { Header } from '../components';

class HeaderContainer extends Component {
  state = {
    menuFixed: false,
    sidebarVisible: false,
  };

  hideFixedMenu = () => this.setState({ menuFixed: false });

  showFixedMenu = () => this.setState({ menuFixed: true });

  render() {
    const { menuFixed } = this.state;

    return (
      <Header
        menuFixed={menuFixed}
        onBottomPassed={this.showFixedMenu}
        onBottomPassedReverse={this.hideFixedMenu}
      />
    );
  }
}

export default HeaderContainer;
