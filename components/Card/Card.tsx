import type { CardMetaProps, CardProps } from 'antd/lib/card'
import { Card as AntCard } from 'antd'
import cx from 'classnames'

interface Props extends CardProps {}

interface MetaProps extends CardMetaProps {}

function Card({ className, ...props }: Props): JSX.Element {
  return <AntCard {...props} className={cx(className, 'card')} />
}

const Meta = (props: MetaProps): JSX.Element => <AntCard.Meta {...props} />

export { Card, Meta }
