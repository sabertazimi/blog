import type { SpaceProps } from 'antd'
import { Space as AntSpace } from 'antd'

interface Props extends SpaceProps {}

const Space = (props: Props) => <AntSpace {...props} />

export default Space
