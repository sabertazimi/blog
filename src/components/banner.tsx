import * as React from 'react'
import { Separator } from '@/components/ui/separator'

interface Props {
  children: React.ReactNode
}

function Banner({ children }: Props) {
  return (
    <div className="flex items-center gap-4 py-6">
      <Separator className="flex-1" />
      <h2 className="shrink-0 text-base font-semibold tracking-tight">
        {children}
      </h2>
      <Separator className="flex-1" />
    </div>
  )
}

export default Banner
