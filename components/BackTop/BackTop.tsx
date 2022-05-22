import type { BackTopProps } from 'antd';
import { BackTop as AntBackTop } from 'antd';

interface Props extends BackTopProps {}

const BackTop = (props: Props): JSX.Element => <AntBackTop {...props} />;

export default BackTop;
