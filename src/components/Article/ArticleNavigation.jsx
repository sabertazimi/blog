import React, { useState, useCallback } from 'react';
import { Button, Drawer } from 'antd';
import { CloseOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Colors } from '@config';
import * as styles from './ArticleNavigation.module.css';

const ArticleNavigation = ({ toc }) => {
  const [tocVisible, setTocVisible] = useState(false);

  const handleClick = useCallback(
    () => setTocVisible(!tocVisible),
    [tocVisible]
  );

  return (
    <div className="fixed hidden m-0 bg-transparent top-8 right-28 z-max md:block">
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
          className={
            tocVisible ? `${styles.toc} ${styles.tocExpanded}` : `${styles.toc}`
          }
          dangerouslySetInnerHTML={{ __html: toc }}
        />
      </Drawer>
    </div>
  );
};

export default ArticleNavigation;
