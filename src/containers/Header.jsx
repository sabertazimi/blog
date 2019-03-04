import React, { Component } from 'react';

import { Header } from '../components';

class HeaderContainer extends Component {
  state = {
    menuFixed: false,
    sidebarVisible: false
  };

  hideFixedMenu = () => this.setState({ menuFixed: false })

  showFixedMenu = () => this.setState({ menuFixed: true })

  toggleSidebar = () => {
    this.setState( { sidebarVisible: !this.state.sidebarVisible });
  }

  render() {
    const { headingHidden } = this.props;
    const { menuFixed, sidebarVisible } = this.state;

    return (
      <Header
        headingHidden={headingHidden}
        menuFixed={menuFixed && !headingHidden}
        sidebarVisible={sidebarVisible}
        onBottomPassed={this.showFixedMenu}
        onBottomPassedReverse={this.hideFixedMenu}
        onToggle={this.toggleSidebar}
      />
    );
  }
}

export default HeaderContainer;
