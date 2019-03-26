import React from 'react';
import { Link } from 'gatsby';
import { Icon, Popup } from 'semantic-ui-react';
import { useResponsive } from '../../hooks';
import './IconBanner.css';

const IconBanner = () => {
  const desktopVisible = useResponsive({ minWidth: 540 });
  const size = desktopVisible ? 'huge' : 'big';

  return (
    <div className="icon-banner">
      <Popup
        position="left center"
        inverted
        content="Posts"
        trigger={
          <Link to="/posts">
            <Icon name="list ul" size={size} className="icon-banner-link" />
          </Link>
        }
      />
      <Popup
        position="left center"
        inverted
        content="Tags"
        trigger={
          <Link to="/tags">
            <Icon name="tags" size={size} className="icon-banner-link" />
          </Link>
        }
      />
      <Popup
        position="left center"
        inverted
        content="Books"
        trigger={
          <Link to="/books">
            <Icon name="book" size={size} className="icon-banner-link" />
          </Link>
        }
      />
      <Popup
        position="left center"
        inverted
        content="About"
        trigger={
          <Link to="/about">
            <Icon name="user" size={size} className="icon-banner-link" />
          </Link>
        }
      />
    </div>
  );
};

export default IconBanner;
