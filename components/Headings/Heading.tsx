import { Typography } from 'antd';
import type { TitleProps } from 'antd/lib/typography/Title';

const Heading = (props: TitleProps): JSX.Element => (
  <Typography.Title {...props} />
);

export default Heading;
