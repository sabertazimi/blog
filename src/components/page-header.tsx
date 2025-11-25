import type { ReactNode } from 'react'
import { FlickeringGrid } from '@/components/ui/flickering-grid'

interface PageHeaderProps {
  title: string
  description: string
  showFlickeringGrid?: boolean
  children?: ReactNode
}

export default function PageHeader({ title, description, showFlickeringGrid = true, children }: PageHeaderProps) {
  return (
    <>
      {showFlickeringGrid && (
        <div className="absolute top-0 left-0 z-0 h-[200px] w-full mask-[linear-gradient(to_top,transparent_25%,black_95%)]">
          <FlickeringGrid
            className="absolute top-0 left-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.2}
            flickerChance={0.05}
          />
        </div>
      )}
      <div className="border-border relative z-10 flex min-h-[250px] flex-col justify-center gap-6 border-b p-6">
        <div className="container mx-auto">
          <div className="flex flex-col gap-2">
            <h1 className="text-primary text-4xl font-extrabold tracking-tighter md:text-5xl">{title}</h1>
            <p className="text-muted-foreground max-w-5xl text-sm md:text-base lg:text-lg">{description}</p>
          </div>
        </div>
        <div className="container mx-auto">{children}</div>
      </div>
    </>
  )
}
