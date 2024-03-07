import type { ImageProps } from 'next/image'
import NextImage from 'next/image'

interface Props extends ImageProps {}

const LocalImage = (props: Props): JSX.Element => <NextImage {...props} />

export default LocalImage
