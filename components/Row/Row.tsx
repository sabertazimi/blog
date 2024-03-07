import type { RowProps } from 'antd'
import { Row as AntRow } from 'antd'

interface Props extends RowProps {}

const Row = (props: Props): JSX.Element => <AntRow {...props} role="row" />

export default Row
