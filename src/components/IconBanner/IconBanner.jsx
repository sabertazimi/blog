import React from 'react';
import { Link } from 'gatsby';
import { Tooltip, Icon } from 'antd';
import { Image } from 'semantic-ui-react';
import banner from 'images/banner.png';
import styles from './IconBanner.module.css';

const IconBanner = () => (
  <React.Fragment>
    <Image src={banner} size="small" alt="banner" />
    <div className={styles.iconBanner}>
      <Tooltip placement="left" title="View Posts">
        <Link to="/posts">
          <Icon type="bars" className={styles.iconBannerLink} />
        </Link>
      </Tooltip>
      <Tooltip placement="left" title="View Tags">
          <Link to="/tags">
            <Icon type="tags" className={styles.iconBannerLink} />
          </Link>
      </Tooltip>
      <Tooltip placement="left" title="View Books">
          <Link to="/books">
            <Icon type="book" className={styles.iconBannerLink} />
          </Link>
      </Tooltip>
      <Tooltip placement="left" title="About Me">
          <Link to="/about">
            <Icon type="user" className={styles.iconBannerLink} />
          </Link>
      </Tooltip>
    </div>
  </React.Fragment>
);

export default IconBanner;
