import { classNames } from '@components/utils';
import type { ReactNode } from 'react';
import Tag from './Tag';

interface Props {
  tag: string;
  icon: ReactNode;
}

const IconTag = ({ tag, icon }: Props): JSX.Element => (
  <Tag
    className={classNames(
      'inline-flex justify-center items-center mt-1 ',
      'bg-black border-black text-light',
      'dark:bg-light dark:border-light dark:text-dark',
      'text-base font-extrabold'
    )}
  >
    {icon}
    <span>{tag}</span>
  </Tag>
);

export default IconTag;
