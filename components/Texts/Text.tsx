import type { TextProps } from 'antd/lib/typography/Text'
import { Typography } from 'antd'
import cx from 'classnames'

interface Props extends TextProps {}

function Text({ className, ...props }: Props): JSX.Element {
  return <Typography.Text {...props} className={cx(className)} />
}

export default Text
