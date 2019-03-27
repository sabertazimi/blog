import React from 'react';
import { Link } from 'gatsby';
import { Image, Icon, Popup } from 'semantic-ui-react';
import './IconBanner.css';
import banner from '../../images/banner.png';

const IconBanner = () => (
  <React.Fragment>
    <Image src={banner} size="small" alt="banner" />
    <div className="icon-banner">
      <Popup
        position="left center"
        inverted
        content="Posts"
        trigger={
          <Link to="/posts">
            <Icon name="list ul" size="big" className="icon-banner-link" />
          </Link>
        }
      />
      <Popup
        position="left center"
        inverted
        content="Tags"
        trigger={
          <Link to="/tags">
            <Icon name="tags" size="big" className="icon-banner-link" />
          </Link>
        }
      />
      <Popup
        position="left center"
        inverted
        content="Books"
        trigger={
          <Link to="/books">
            <Icon name="book" size="big" className="icon-banner-link" />
          </Link>
        }
      />
      <Popup
        position="left center"
        inverted
        content="About"
        trigger={
          <Link to="/about">
            <Icon name="user" size="big" className="icon-banner-link" />
          </Link>
        }
      />
    </div>
  </React.Fragment>
);

export default IconBanner;
