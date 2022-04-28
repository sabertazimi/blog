import Button from '@components/Button';
import Drawer from '@components/Drawer';
import { Close, MenuFold } from '@components/Icons';
import { classNames } from '@components/utils';
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
        size="large"
        shape="circle"
        className="button-primary"
        icon={
          tocVisible ? (
            <Close aria-label="Close" />
          ) : (
            <MenuFold aria-label="Menu" />
          )
        }
        onClick={handleClick}
      />
      <Drawer
        title="Table of Contents"
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
