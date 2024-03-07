import type { ImageProps } from 'antd'
import { Image as AntImage } from 'antd'

interface Props extends ImageProps {}

const Image = (props: Props): JSX.Element => <AntImage {...props} />

export default Image
