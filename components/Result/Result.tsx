import type { ResultProps } from 'antd';
import { Result as AntResult } from 'antd';

interface Props extends ResultProps {}

const Result = (props: Props): JSX.Element => <AntResult {...props} />;

export default Result;
