import React from 'react';
import { Link } from 'gatsby';
import { Icon } from 'semantic-ui-react';
import { useResponsive } from '../../hooks';
import './IconBanner.css';

const IconBanner = () => {
  const desktopVisible = useResponsive({ minWidth: 540 });
  const size = desktopVisible ? 'huge' : 'big';

  return (
    <div className="icon-banner">
      <Link to="/posts" activeClassName="active">
        <Icon name="list ul" size={size} className="icon-banner-link" />
      </Link>
      <Link to="/tags" activeClassName="active">
        <Icon name="tags" size={size} className="icon-banner-link" />
      </Link>
      <Link to="/books" activeClassName="active">
        <Icon name="book" size={size} className="icon-banner-link" />
      </Link>
      <Link to="/about" activeClassName="active">
        <Icon name="user" size={size} className="icon-banner-link" />
      </Link>
    </div>
  );
};

export default IconBanner;
