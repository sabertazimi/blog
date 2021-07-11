import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { CloseOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useResponsive } from 'hooks';
import { BreakPoints, Colors } from 'config';
import * as styles from './ArticleNavigation.module.css';

const ArticleNavigation = ({ toc }) => {
  const [tocVisible, setTocVisible] = useState(false);
  const isNotMobile = useResponsive({ minWidth: BreakPoints.mobile });

  const handleClick = () => setTocVisible(!tocVisible);

  return isNotMobile ? (
    <div
      className={styles.tocContainer}
      style={{ margin: 0, backgroundColor: Colors.primary }}
    >
      <Button
        type="primary"
        shape="circle"
        icon={tocVisible ? <CloseOutlined /> : <MenuFoldOutlined />}
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
