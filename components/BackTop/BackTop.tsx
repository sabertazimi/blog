'use client'

import type { BackTopProps } from 'antd'
import { FloatButton } from 'antd'

interface Props extends BackTopProps {}

function BackTop(props: Props): JSX.Element {
  return <FloatButton.BackTop {...props} />
}

export default BackTop
