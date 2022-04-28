import { Typography } from 'antd';
import type { TextProps } from 'antd/lib/typography/Text';

interface Props extends TextProps {}

const Text = (props: Props): JSX.Element => <Typography.Text {...props} />;

export default Text;
