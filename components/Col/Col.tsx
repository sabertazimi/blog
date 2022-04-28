import type { ColProps } from 'antd';
import { Col as AntCol } from 'antd';

interface Props extends ColProps {}

const Col = (props: Props): JSX.Element => <AntCol {...props} />;

export default Col;
