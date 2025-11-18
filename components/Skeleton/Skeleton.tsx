import type { SkeletonProps } from 'antd'
import { Skeleton as AntSkeleton } from 'antd'

interface Props extends SkeletonProps {}

const Skeleton = (props: Props) => <AntSkeleton {...props} />

export default Skeleton
