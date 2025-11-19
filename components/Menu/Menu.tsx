import type { MenuProps } from 'antd'
import { Menu as AntMenu } from 'antd'

interface Props extends MenuProps {}

const Menu = (props: Props) => <AntMenu {...props} />

export default Menu
