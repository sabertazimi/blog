import Link from '@components/Link';
import { classNames } from '@components/utils';
import { getColorByName } from '@config';
import type { Tag as TagType } from '@types';
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
    className={classNames('mb-1 text-base font-extrabold', className)}
  >
    <Link href={href}>{tag}</Link>
  </Tag>
);

export default LinkTag;
