import type { AlertProps } from 'antd'
import { Alert as AntAlert } from 'antd'

interface Props extends AlertProps {}

const Alert = (props: Props) => <AntAlert {...props} />

export default Alert
