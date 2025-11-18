import type { AnchorProps } from 'antd'
import { Anchor as AntAnchor } from 'antd'

interface Props extends AnchorProps {}

const Anchor = (props: Props) => <AntAnchor {...props} />

export default Anchor
