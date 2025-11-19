import type { ButtonProps } from 'antd'
import { Button as AntButton } from 'antd'

interface Props extends ButtonProps {}

const Button = (props: Props) => <AntButton {...props} />

export default Button
