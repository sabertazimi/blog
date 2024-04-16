import { AntdRegistry } from '@ant-design/nextjs-registry'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import ProgressBarProvider from '@/components/ProgressBarProvider'
import SandpackProvider from '@/components/SandpackProvider'
import { getMetadata, getViewport } from '@/config'

// Keep stylesheets importing order
import '../styles/globals.css'
import '../components/Article/Article.css'
import '../components/Button/Button.css'
import '../components/Card/Card.css'
import '../components/Skeleton/Skeleton.css'

export function generateMetadata(): Metadata {
  return getMetadata()
}

export function generateViewport(): Viewport {
  return getViewport()
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <SandpackProvider />
      </head>
      <body>
        <AntdRegistry>
          <ProgressBarProvider>
            {children}
          </ProgressBarProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
