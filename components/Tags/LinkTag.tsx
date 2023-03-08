import Link from '@components/Link';
import { cx } from '@components/utils';
import { getColorByName } from '@config';
import type { Tag as TagType } from '@types';
import styles from './LinkTag.module.css';
import Tag from './Tag';

interface Props {
  tag?: TagType;
  href?: string;
  color?: string;
  className?: string;
}

const LinkTag = ({
  tag = 'Computer Science',
  href = `/tag/${tag}`,
  color = getColorByName(tag),
  className,
}: Props): JSX.Element => (
  <Tag
    color={color}
    className={cx(styles.link, 'dark:hover:shadow-primary', className)}
  >
    <Link href={href}>{tag}</Link>
  </Tag>
);

export default LinkTag;
