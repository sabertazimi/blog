import { cx } from '@components/utils';
import type { ReactNode } from 'react';
import Tag from './Tag';

interface Props {
  tag: string;
  icon: ReactNode;
}

const IconTag = ({ tag, icon }: Props): JSX.Element => (
  <Tag
    className={cx(
      'mt-1 inline-flex items-center justify-center',
      'rounded-none border-black bg-black text-base font-extrabold text-light',
      'dark:border-light dark:bg-light dark:text-dark'
    )}
  >
    {icon}
    <span>{tag}</span>
  </Tag>
);

export default IconTag;
