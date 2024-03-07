import type { BackTopProps } from 'antd'
import { FloatButton } from 'antd'

interface Props extends BackTopProps {}

const BackTop = (props: Props): JSX.Element => (
  <FloatButton.BackTop {...props} />
)

export default BackTop
