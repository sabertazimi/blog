import Link from '@components/Link';
import { getColorByName } from '@config';
import type { Tag } from '@types';
import { Tag as AntTag } from 'antd';
import classNames from 'classnames';

interface Props {
  tag?: Tag;
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
  <AntTag
    color={color}
    className={classNames('mb-1 text-base font-extrabold', className)}
  >
    <Link href={href}>{tag}</Link>
  </AntTag>
);

export default LinkTag;
