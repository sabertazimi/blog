import type { TooltipProps } from 'antd'
import { Tooltip as AntTooltip } from 'antd'

type Props = TooltipProps

const Tooltip = (props: Props): JSX.Element => <AntTooltip {...props} />

export default Tooltip
