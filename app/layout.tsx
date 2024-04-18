import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { AntdProvider, ProgressBarProvider, SandpackProvider } from '@/components'
import { getMetadata, getViewport } from '@/config'

// Keep stylesheets importing order
import '@/styles/globals.css'
import '@/components/Article/Article.css'
import '@/components/Card/Card.css'

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
        <AntdProvider>
          <ProgressBarProvider>
            {children}
          </ProgressBarProvider>
        </AntdProvider>
      </body>
    </html>
  )
}
