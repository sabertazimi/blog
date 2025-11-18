import type { TextProps } from 'antd/lib/typography/Text'
import { Typography } from 'antd'
import cx from 'classnames'

interface Props extends TextProps {}

function Text({ className, ...props }: Props) {
  return <Typography.Text {...props} className={cx(className)} />
}

export default Text
