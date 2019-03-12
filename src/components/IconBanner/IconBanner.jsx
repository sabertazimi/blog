import React from 'react';
import { Link } from 'gatsby';
import { Icon } from 'semantic-ui-react';
import './IconBanner.css';

const IconBanner = () => {
  return (
    <div className="icon-banner">
      <Link to="/posts" activeClassName="active">
        <Icon name="list ul" size="huge" className="icon-banner-link" />
      </Link>
      <Link to="/tags" activeClassName="active">
        <Icon name="tags" size="huge" className="icon-banner-link" />
      </Link>
      <Link to="/books" activeClassName="active">
        <Icon name="book" size="huge" className="icon-banner-link" />
      </Link>
      <Link to="/about" activeClassName="active">
        <Icon name="user" size="huge" className="icon-banner-link" />
      </Link>
    </div>
  );
};

export default IconBanner;
