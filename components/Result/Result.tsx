import type { ResultProps } from 'antd'
import { Result as AntResult } from 'antd'

interface Props extends ResultProps {}

const Result = (props: Props) => <AntResult {...props} />

export default Result
