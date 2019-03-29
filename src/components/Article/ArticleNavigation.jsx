import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { useResponsive } from '../../hooks';
import { BreakPoints, PRIMARY_COLOR } from '../../constants';
import styles from './ArticleNavigation.module.css';

const ArticleNavigation = ({ toc }) => {
  const isnotMobile = useResponsive({ minWidth: BreakPoints.mobile });
  const buttonSize = isnotMobile ? 'large' : 'small';

  return isnotMobile ? (
    <Button
      className={styles.tocContainer}
      size={buttonSize}
      color={PRIMARY_COLOR}
      style={{
        margin: 0,
      }}
    >
      <Icon name="bars" style={{ margin: 0 }} />
      <div className={styles.toc} dangerouslySetInnerHTML={{ __html: toc }} />
    </Button>
  ) : null;
};

export default ArticleNavigation;
