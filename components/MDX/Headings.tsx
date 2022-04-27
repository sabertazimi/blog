import { Typography } from 'antd';
import type { TitleProps } from 'antd/lib/typography/Title';

interface Props {}

const Heading = (props: TitleProps): JSX.Element => (
  <Typography.Title {...props} />
);

const H1 = (props: Props): JSX.Element => <Heading {...props} level={1} />;

const H2 = (props: Props): JSX.Element => <Heading {...props} level={2} />;

const H3 = (props: Props): JSX.Element => <Heading {...props} level={3} />;

const H4 = (props: Props): JSX.Element => <Heading {...props} level={4} />;

const H5 = (props: Props): JSX.Element => <Heading {...props} level={5} />;

const Headings = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H5,
};

export default Headings;
