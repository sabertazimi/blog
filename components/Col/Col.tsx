import type { ColProps } from 'antd'
import { Col as AntCol } from 'antd'

interface Props extends ColProps {}

const Col = (props: Props) => <AntCol {...props} role="cell" />

export default Col
