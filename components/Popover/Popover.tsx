import type { PopoverProps } from 'antd'
import { Popover as AntPopover } from 'antd'

interface Props extends PopoverProps {}

const Popover = (props: Props): JSX.Element => <AntPopover {...props} />

export default Popover
