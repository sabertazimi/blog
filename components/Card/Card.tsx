import { classNames } from '@components/utils';
import { Card as AntCard } from 'antd';
import type { CardMetaProps, CardProps } from 'antd/lib/card';

interface Props extends CardProps {}

interface MetaProps extends CardMetaProps {}

const Card = ({ className, ...props }: Props): JSX.Element => (
  <AntCard {...props} className={classNames(className, 'card')} />
);

const Meta = (props: MetaProps): JSX.Element => <AntCard.Meta {...props} />;

export { Card, Meta };
