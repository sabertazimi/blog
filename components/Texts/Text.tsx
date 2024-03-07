import { cx } from '@components/utils'
import { Typography } from 'antd'
import type { TextProps } from 'antd/lib/typography/Text'

interface Props extends TextProps {}

const Text = ({ className, ...props }: Props): JSX.Element => (
  <Typography.Text {...props} className={cx(className, 'dark:text-light')} />
)

export default Text
