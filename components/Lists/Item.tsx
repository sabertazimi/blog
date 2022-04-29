import { ArrowRight } from '@components/Icons';
import { classNames } from '@components/utils';
import { siteConfig } from '@config';
import type { HTMLProps } from 'react';
import styles from './Item.module.css';

interface Props extends HTMLProps<HTMLLIElement> {}

const Item = ({ children, className, ...props }: Props): JSX.Element => (
  <li {...props} className={classNames(className, styles.item)}>
    <ArrowRight style={{ color: siteConfig.themeColor }} />
    <div>{children}</div>
  </li>
);

export default Item;