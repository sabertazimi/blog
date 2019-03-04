import React, { Component } from 'react';

// const onlyMobile = { minWidth: 320, maxWidth: 767 };
// const onlyTablet = { minWidth: 768, maxWidth: 991 };
// const onlyComputer = { minWidth: 992 };
// const onlyLargeScreen = { minWidth: 1200, maxWidth: 1919 };
// const onlyWidescreen = { minWidth: 1920 };

const fitsMaxWidth = (width, maxWidth) => (!maxWidth || width <= maxWidth);
const fitsMinWidth = (width, minWidth) => (!minWidth || width >= minWidth);

const isVisible = (width, { maxWidth, minWidth }) => (
  fitsMinWidth(width, minWidth) && fitsMaxWidth(width, maxWidth)
);

export default class Responsive extends Component {
  state = {
    visible: true,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleUpdate();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    cancelAnimationFrame(this.frameId);
  }

  getWidth = () => {
    const { getWidth: gw } = this.props;

    if (gw) {
      return gw();
    }

    return window.innerWidth || 0;
  }

  handleResize = (event) => {
    if (this.ticking) return;

    this.ticking = true;
    this.frameId = requestAnimationFrame(() => this.handleUpdate(event));
  }

  handleUpdate = (event) => {
    this.ticking = false;

    const { onUpdate } = this.props;
    const { visible } = this.state;
    const width = this.getWidth();
    const nextVisible = isVisible(width, this.props);

    if (visible !== nextVisible) {
      this.setState({ visible: nextVisible });
    }

    if (onUpdate) {
      onUpdate(event, { ...this.props, width });
    }
  }

  render() {
    const { children } = this.props;
    const { visible } = this.state;

    if (visible) {
      return (
        <React.Fragment>
          {children}
        </React.Fragment>
      );
    }

    return null;
  }
}
