import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'

const Editor = dynamic(async () => import('./editor'))

const mdxComponents = {
  Button,
  Editor,
}

export default mdxComponents
