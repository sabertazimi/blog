import React, { useState, useCallback } from 'react';
import { Button, Drawer } from 'antd';
import { CloseOutlined, MenuFoldOutlined } from '@ant-design/icons';
import * as styles from './ArticleNav.module.css';

const ArticleNav = ({ toc }) => {
  const [tocVisible, setTocVisible] = useState(false);

  const handleClick = useCallback(
    () => setTocVisible((tocVisible) => !tocVisible),
    []
  );

  return (
    <div className="fixed hidden m-0 bg-transparent top-8 right-28 z-max md:block">
      <Button
        className="button-primary"
        shape="circle"
        icon={tocVisible ? <CloseOutlined /> : <MenuFoldOutlined />}
        size="large"
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
            tocVisible
              ? `transition transform-gpu scale-100 ${styles.toc}`
              : `transition transform-gpu scale-0 ${styles.toc}`
          }
          dangerouslySetInnerHTML={{ __html: toc }}
        />
      </Drawer>
    </div>
  );
};

export default ArticleNav;
