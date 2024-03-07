import type { TagProps } from 'antd'
import { Tag as AntTag } from 'antd'

interface Props extends TagProps {}

const Tag = (props: Props): JSX.Element => <AntTag {...props} />

export default Tag
