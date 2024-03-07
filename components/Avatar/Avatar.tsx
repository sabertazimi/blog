import type { AvatarProps } from 'antd'
import { Avatar as AntAvatar } from 'antd'

interface Props extends AvatarProps {}

const Avatar = (props: Props): JSX.Element => <AntAvatar {...props} />

export default Avatar
