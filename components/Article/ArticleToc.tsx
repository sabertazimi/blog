import { Close, MenuFold } from '@components/Icons';
import { classNames } from '@components/utils';
import { Button, Drawer } from 'antd';
import { useCallback, useState } from 'react';
import styles from './ArticleToc.module.css';

interface Props {
  toc?: string;
}

const ArticleToc = ({ toc = '' }: Props): JSX.Element => {
  const [tocVisible, setTocVisible] = useState(false);

  const handleClick = useCallback(
    () => setTocVisible(tocVisible => !tocVisible),
    []
  );

  return (
    <div
      className={classNames(
        'fixed hidden m-0 bg-transparent',
        'top-8 right-28 z-max',
        'md:block'
      )}
      role="navigation"
    >
      <Button
        className="button-primary"
        shape="circle"
        icon={
          tocVisible ? (
            <Close aria-label="Close" />
          ) : (
            <MenuFold aria-label="Menu" />
          )
        }
        size="large"
        onClick={handleClick}
      />
      <Drawer
        className="font-extrabold text-dark"
        title="Table of Contents"
        placement="right"
        closable={false}
        onClose={handleClick}
        visible={tocVisible}
      >
        <div
          className={classNames('transition transform-gpu', styles.toc, {
            'scale-100': tocVisible,
            'scale-0': !tocVisible,
          })}
          dangerouslySetInnerHTML={{ __html: toc }}
          onClick={handleClick}
        />
      </Drawer>
    </div>
  );
};

export default ArticleToc;
