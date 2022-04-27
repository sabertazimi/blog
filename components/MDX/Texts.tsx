import { Typography } from 'antd';
import type { TextProps } from 'antd/lib/typography/Text';

interface Props {}

const Text = (props: TextProps): JSX.Element => <Typography.Text {...props} />;

const Strong = (props: Props): JSX.Element => <Text {...props} strong />;

const Emphasis = (props: Props): JSX.Element => <Text {...props} italic />;

const Delete = (props: Props): JSX.Element => <Text {...props} delete />;

const Texts = {
  strong: Strong,
  em: Emphasis,
  del: Delete,
};

export default Texts;
