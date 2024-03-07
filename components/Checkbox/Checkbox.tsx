import type { CheckboxProps } from 'antd'
import { Checkbox as AntCheckbox } from 'antd'

interface Props extends CheckboxProps {}

const Checkbox = (props: Props): JSX.Element => <AntCheckbox {...props} />

export default Checkbox
