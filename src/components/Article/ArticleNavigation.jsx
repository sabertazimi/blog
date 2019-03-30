import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { useResponsive } from 'hooks';
import { BreakPoints, Colors } from 'config';
import styles from './ArticleNavigation.module.css';

const ArticleNavigation = ({ toc }) => {
  const [tocVisible, setTocVisible] = useState(false);
  const isnotMobile = useResponsive({ minWidth: BreakPoints.mobile });

  const handleClick = () => setTocVisible(!tocVisible);

  return isnotMobile ? (
    <div
      className={styles.tocContainer}
      style={{ margin: 0, backgroundColor: Colors.primary }}
    >
      <Button
        type="primary"
        shape="circle"
        icon={tocVisible ? 'close' : 'menu-fold'}
        size="large"
        style={{ color: Colors.light }}
        onClick={handleClick}
      />
      <Drawer
        title="Table of Contents"
        placement="right"
        closable={false}
        onClose={handleClick}
        visible={tocVisible}
      >
        <div
          className={`${styles.toc} ${tocVisible ? styles.tocExpanded : ''}`}
          dangerouslySetInnerHTML={{ __html: toc }}
        />
      </Drawer>
    </div>
  ) : null;
};

export default ArticleNavigation;
